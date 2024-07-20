import React from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../../services/UserService';
import { paperAPI } from '../../services/PaperService';
import { useForm } from 'react-hook-form';
import { PaperForm } from '../../models/IPaper';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Defining the validation schema using zod
const schema = z.object({
  paperId: z.string().min(3, 'Paper Id is required'),
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  uri: z.string(),
  formattedSize: z.string(),
  updateName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const PaperDetails = () => {
  // Extracting the paperId parameter from the URL
  const { paperId } = useParams();

  // Setting up form handling with react-hook-form and zod for validation
  const { register, handleSubmit, formState: form, getFieldState } = useForm<PaperForm>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  // Fetching user data and paper data using custom hooks from RTK Query
  const { data: userData } = userAPI.useFetchUserQuery();
  const { data: paperData, isLoading, error, isSuccess } = paperAPI.useFetchPaperQuery(paperId);

  // Setting up mutations for updating and downloading paper
  const [updatePaper, { data: updateData, isLoading: updateLoading, error: updateError, isSuccess: updateSuccess }] = paperAPI.useUpdatePaperMutation();
  const [downloadPaper, { data: downloadData, isLoading: downloadLoading, error: downloadError, isSuccess: downloadSuccess }] = paperAPI.useDownloadPaperMutation();

  // Utility function to check if a form field is valid
  const isFieldValid = (fieldName: keyof PaperForm): boolean =>
    getFieldState(fieldName, form).isTouched && !getFieldState(fieldName, form).invalid;

  // Handler for updating paper details
  const onUpdatePaper = async (form: PaperForm) => await updatePaper(form);

  // Handler for downloading paper
  const onDownloadPaper = async (paperName: string) => {
    const resource = await downloadPaper(paperName).unwrap();
    const url = URL.createObjectURL(new Blob([resource]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', paperName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // URL.revokeObjectURL(link.href); // Commented out to avoid potential issues with URL revocation
  };

  return (
    // TODO: Implement the UI for displaying paper details and handling updates and downloads
    <div>PaperDetails</div> // Placeholder div to be replaced with actual content
  );
};

export default PaperDetails;
