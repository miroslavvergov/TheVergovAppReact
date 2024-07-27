import React from 'react';
import { Query } from '../../models/IPaper';
import { paperAPI } from '../../services/PaperService';
import PaperLoader from './PaperLoader';
import Paper from './Paper';

const Papers = () => {
  // Ref to the input element for selecting files
  const inputRef = React.useRef<HTMLInputElement>();
  // State to manage the query parameters for fetching papers
  const [query, setQuery] = React.useState<Query>({ page: 0, size: 4, name: '' });

  // Fetching papers based on the current query
  const {
    data: paperData,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = paperAPI.useFetchPapersQuery(query);

  // Mutation for uploading papers
  const [
    uploadPapers
  ] = paperAPI.useUploadPapersMutation();

  // Function to trigger file selection
  const selectPapers = () => inputRef.current.click();

  // Function to navigate between pages
  const goToPage = async (direction: string) => {
    direction === 'back' ? 
      setQuery((prev) => ({ ...prev, page: prev.page - 1 })) : 
      setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  }

  // Function to handle paper uploads
  const onUploadPapers = async (papers: FileList) => {
    if (papers) {
      const form = new FormData();
      Array.from(papers).forEach(paper => form.append('files', paper, paper.name));
      await uploadPapers(form);
    }
  };

  // Display loader while fetching data
  if (isLoading) {
    return <PaperLoader />
  }
  return (
    <div className="container mtb">
      <div className="row">
        <div className="col-lg-12">
          <div className="align-items-center row">
            <div className="col-lg-4">
              <div className="mb-3 mb-lg-0">
                { paperData?.data.documents.content?.length > 0 && 
                <h6 className="fs-16 mb-0">{`Showing ${(paperData?.data?.documents.number * paperData?.data?.documents.size) + 1} - ${((paperData?.data?.documents.number * paperData?.data?.documents.size)) + paperData?.data.documents.content?.length} of ${paperData?.data?.documents.totalElements} results`}</h6>}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="candidate-list-widgets">
                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <div className="selection-widget">
                      <input type="search" onChange={(event) => setQuery((prev) => { return { ...prev, page: 0, name: event.target.value } })} name='name' className='form-control' id="email" placeholder="Search documents" required />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="selection-widget">
                      <select onChange={(event) => setQuery((prev) => { return { ...prev, size: +event.target.value } })} className="form-select" data-trigger="true" name="size" aria-label="Select page size">
                        <option value="4">Per page (4)</option>
                        <option value="6">6</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="selection-widget mt-2 mt-lg-0">
                      <button type="button" onClick={selectPapers} className="btn btn-primary w-100" style={{ display: 'inline-block' }}>
                        <i className="bi bi-upload upload-icon"></i>
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="candidate-list">
            {paperData?.data.documents.content?.length === 0 && <h4 className='card mt-4 align-items-center row' style={{border: 'none', boxShadow: 'none'}}>No documents found</h4>}
            {paperData?.data.documents.content.map(paper => <Paper {...paper} key={paper.id} />)}
          </div>
        </div>
      </div>
      {paperData?.data.documents.content?.length > 0 && paperData?.data?.documents.totalPages > 1 &&
        <div className="row">
          <div className="mt-4 pt-2 col-lg-12">
            <nav aria-label="Page navigation example">
              <div className="pagination job-pagination mb-0 justify-content-center">
                <li className="page-item">
                  <a onClick={() => goToPage('back')} className={`page-link ' ${0 === query.page ? 'disabled' : undefined}`}>
                    <i className="bi bi-chevron-double-left"></i>
                  </a>
                </li>
                {[...Array(paperData?.data?.documents.totalPages).keys()].map((page, index) =>
                  <li key={page} className='page-item'>
                    <a onClick={() => setQuery((prev) => { return { ...prev, page } })} className={`page-link ' ${page === query.page ? 'active' : undefined}`}>{page + 1}</a>
                  </li>
                )}
                <li className="page-item">
                  <a onClick={() => goToPage('forward')} className={`page-link ' ${paperData?.data?.documents.totalPages === query.page + 1 ? 'disabled' : undefined}`}>
                    <i className="bi bi-chevron-double-right"></i>
                  </a>
                </li>
              </div>
            </nav>
          </div>
        </div>}
      <div style={{ display: 'none' }}>
        <input type='file' ref={inputRef} onChange={(event) => onUploadPapers(event.target.files)} name='file' accept='*' multiple />
      </div>
    </div>
  )
}

export default Papers;
