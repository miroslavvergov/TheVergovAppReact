import React from 'react'
import { useParams } from 'react-router-dom'
import { userAPI } from '../../services/UserService';
import { paperAPI } from '../../services/PaperService';
import { useForm } from 'react-hook-form';
import { PaperForm } from '../../models/IPaper';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  paperId: z.string().min(3, 'Paper Id is required'),
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  uri: z.string(),
  formattedSize: z.string(),
  updateName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const PaperDetails = () => {
  const { paperId } = useParams();
  const { register, handleSubmit, formState: form, getFieldState } = useForm<PaperForm>({ resolver: zodResolver(schema), mode: 'onTouched' })
  const { data: userData } = userAPI.useFetchUserQuery();
  const { data: paperData, isLoading, error, isSuccess } = paperAPI.useFetchPaperQuery(paperId);
  const [updatePaper, { data: updateData, isLoading: updateLoading, error: updateError, isSuccess: updateSuccess }] = paperAPI.useUpdatePaperMutation();
  const [downloadPaper, { data: downloadData, isLoading: downloadLoading, error: downloadError, isSuccess: downloadSuccess }] = paperAPI.useDownloadPaperMutation();


  const isFieldValid = (fieldName: keyof PaperForm): boolean => getFieldState(fieldName, form).isTouched && !getFieldState(fieldName, form).invalid;

  const onUpdatePaper = async (form: PaperForm) => await updatePaper(form);

  const onDownloadPaper = async (paperName: string) => {
    const resource = await downloadPaper(paperName).unwrap();
    const url = URL.createObjectURL(new Blob([resource]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', paperName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // URL.revokeObjectURL(link.href);
  };

  return (
    // TODO
    <div>PaperDetails</div>
  )
}

export default PaperDetails