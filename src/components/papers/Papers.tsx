import React from 'react'
import { Query } from '../../models/IPaper';
import { paperAPI } from '../../services/PaperService';
import PaperLoader from './PaperLoader';

const Papers = () => {
  const inputRef = React.useRef<HTMLInputElement>();
  const [query, setQuery] = React.useState<Query>({ page: 0, size: 4, name: '' });

  const {
    data: paperData,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = paperAPI.useFetchPapersQuery(query);

  const [
    uploadPapers,
    {
      data: uploadData,
      isLoading: uploadLoading,
      error: uploadError,
      isSuccess: uploadSuccess
    },
  ] = paperAPI.useUploadPapersMutation();

  const selectPapers = () => inputRef.current.click();

  const goToPage = async (direction: string) => {
    direction === 'back' ? setQuery((prev) => { return { ...prev, page: prev.page - 1 } }) : setQuery((prev) => { return { ...prev, page: prev.page + 1 } })
  }


  const onUploadPapers = async (papers: FileList) => {
    if (papers) {
      const form = new FormData();
      Array.from(papers).forEach(paper => form.append('files', paper, paper.name));
      await uploadPapers(form);
    }
  };

  if(isLoading) {

    // TODO
    return <PaperLoader/>
  }

  return (
    // TODO
    <div>

    </div>
  )
}

export default Papers;
