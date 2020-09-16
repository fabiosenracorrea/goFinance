import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
  uploaded?: boolean;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [uploadError, setUploadError] = useState(false);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const mappedFiles = await Promise.all(
      uploadedFiles.map(async file => {
        if (file.uploaded) return file;

        const data = new FormData();

        data.append('file', file.file);

        try {
          await api.post('/transactions/import', data);
          const uploadedFile = { ...file, uploaded: true };
          return uploadedFile;
        } catch (err) {
          return file;
        }
      }),
    );

    setUploadedFiles(mappedFiles);

    history.push('/');
  }

  function submitFile(files: File[]): void {
    const submitedFiles = files.map(file => {
      const { size, name } = file;

      const readableSize = filesize(size, { base: 10 });

      return { file, readableSize, name };
    });

    setUploadedFiles([...uploadedFiles, ...submitedFiles]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
