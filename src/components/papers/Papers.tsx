import React from 'react';
import { Query } from '../../models/IPaper';
import { paperAPI } from '../../services/PaperService';
import PaperLoader from './PaperLoader';

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
    uploadPapers,
    {
      data: uploadData,
      isLoading: uploadLoading,
      error: uploadError,
      isSuccess: uploadSuccess
    },
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
    // TODO: Implement a proper loading spinner or animation
    return <PaperLoader />
  }

  return (
    // TODO: Implement the UI for displaying and managing papers
    <div>
      {/* Placeholder div to be replaced with actual content */}
    </div>
  )
}

export default Papers;
