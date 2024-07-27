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
  const [updatePaper] = paperAPI.useUpdatePaperMutation();
  const [downloadPaper] = paperAPI.useDownloadPaperMutation();

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

  if (isLoading) {
    return (
      <div className="container mtb">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (isSuccess) {
    return (
      <div className="container mtb">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <div className="text-center border-end">
                      <img src={paperData.data.paper.icon} className="avatar-xxl" alt={paperData.data.paper.name} />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="ms-3 text-lg-start text-sm-center text-xs-center">
                      <h4 className="card-title mb-2 mt-sm-3">{paperData.data.paper.name}</h4>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <button type="button" onClick={() => onDownloadPaper(paperData.data.paper.name)} className="btn btn-primary downloadb"><i className="bi bi-download"></i> Download</button>
                          {userData.data.user.authorities.includes('paper:delete') && <button type="button" className="btn btn-danger"><i className="bi bi-trash"></i> Delete</button>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane active show" id="tasks-tab" role="tabpanel">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card right-profile-card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onUpdatePaper)} className="needs-validation" noValidate>
                        <h4 className="mb-3">paper Details
                        </h4>
                        <hr />
                        <div className="row g-3">
                          <div className="col-sm-6">
                            <input type="hidden" {...register('paperId')} name='paperId' className='disabled' defaultValue={paperData.data.paper.paperId} required />
                            <label htmlFor="firstName" className="form-label">Name</label><div className="input-group has-validation">
                              <span className="input-group-text"><i className="bi bi-file-earmark-text-fill"></i></span>
                              <input type="text" {...register('name')} name='name' className={`form-control ' ${form.errors.name ? 'is-invalid' : ''} ${isFieldValid('name') ? 'is-valid' : ''}`} placeholder="paper name" defaultValue={paperData.data.paper.name} required disabled={!userData.data.user.authorities.includes('paper:update')} />
                              <div className="invalid-feedback">{form.errors?.name?.message}</div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="lastName" className="form-label">Size</label>
                            <div className="input-group has-validation">
                              <span className="input-group-text"><i className="bi bi-database"></i></span>
                              <input type="text" {...register('formattedSize')} name='size' className="form-control disabled" defaultValue={paperData.data.paper.formattedSize} placeholder="Size" required readOnly />
                              <div className="">{form.errors?.name?.message}</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="email" className="form-label">Last Updated By</label>
                            <div className="input-group has-validation">
                              <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                              <input type="text" {...register('updaterName')} className="form-control disabled" defaultValue={paperData.data.paper.updaterName} placeholder="updaterName" required readOnly />
                              <div className="">{form.errors?.name?.message}</div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="firstName" className="form-label">Created At</label><div className="input-group has-validation">
                              <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                              <input type="text" {...register('createdAt')} defaultValue={new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(paperData.data.paper.createdAt))} className="form-control disabled" placeholder="paper name" required readOnly />
                              <div className="">{form.errors?.name?.message}</div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="lastName" className="form-label">Last Updated At</label>
                            <div className="input-group has-validation">
                              <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                              <input type="text" {...register('updatedAt')} defaultValue={new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(paperData.data.paper.updatedAt))} className="form-control disabled" placeholder="Size" required readOnly />
                              <div className="">{form.errors?.name?.message}</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="email" className="form-label">URI</label>
                            <div className="input-group has-validation">
                              <span className="input-group-text"><i className="bi bi-usb"></i></span>
                              <input type="text" {...register("uri")} name='uri' defaultValue={paperData.data.paper.uri} className="form-control disabled" placeholder="URI" required readOnly />
                              <div className="">{form.errors?.name?.message}</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea {...register('description')} name='description' defaultValue={paperData.data.paper.description} className={`form-control ' ${form.errors.description ? 'is-invalid' : ''} ${isFieldValid('description') ? 'is-valid' : ''}`} placeholder="Description" rows={3} required disabled={!userData.data.user.authorities.includes('paper:update')}></textarea>
                            <div className="invalid-feedback">{form.errors?.description?.message}</div>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="col">
                          <button disabled={form.isSubmitting || isLoading || !userData.data.user.authorities.includes('paper:update')} className="btn btn-primary btn-block" type="submit" >
                            {(form.isSubmitting || isLoading) && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            <span role="status">{(form.isSubmitting || isLoading) ? 'Loading...' : 'Update'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body">
                <div className="pb-2">
                  <h4 className="card-title mb-3">Description</h4>
                  <hr />
                  <p>{paperData.data.paper.description}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div>
                  <h4 className="card-title mb-4">paper Owner</h4>
                  <hr />
                  <div className="table-responsive">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Name</th>
                          <td>{paperData.data.paper.ownerName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Email</th>
                          <td>{paperData.data.paper.ownerEmail}</td>
                        </tr>
                        <tr>
                          <th scope="row">Phone</th>
                          <td>{paperData.data.paper.ownerPhone}</td>
                        </tr>
                        <tr>
                          <th scope="row">Last Login</th>
                          <td>{new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(paperData.data.paper.createdAt))}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default PaperDetails;
