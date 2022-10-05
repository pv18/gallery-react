import React, {useContext} from 'react';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import PhotoModal from './components/PhotoModal';
import AlbumSelect from './components/AlbumSelect';
import {PhotoContext} from './context/PhotoContext';
import {PhotoList} from './components/PhotoList';


const App = () => {
    const {
        photos,
        selectedPhoto,
        setSelectedPhoto,
        albumIds,
        selectAlbumId,
        deletePhoto,
        page,
        setPage,
        pagesCount,
    } = useContext(PhotoContext)

    return (
        <Container>
            <PhotoModal
                photo={selectedPhoto}
                onClose={() => setSelectedPhoto(null)}/>
            <AlbumSelect
                onChange={(_:any, value:number) => selectAlbumId(value)}
                options={albumIds}
                getOptionLabel={(option: any) => option.toString()}
                style={{marginBottom: '20px'}}
            />
            <PhotoList
                photos={photos}
                handleDeletePhoto={deletePhoto}
                handleSelectPhoto={setSelectedPhoto}
            />
            <Pagination
                page={page}
                onChange={(_, value) => setPage(value)}
                count={pagesCount}
                variant={'outlined'}
                shape={'rounded'}/>
        </Container>
    );
};

export default App;