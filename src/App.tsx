import React, {useContext, useEffect, useMemo, useState} from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Photo} from './types/shared';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Pagination from '@mui/material/Pagination';
import PhotoModal from './components/PhotoModal';
import AlbumSelect from './components/AlbumSelect';
import {PhotoContext} from './context/PhotoContext';
import {getPhotos} from './services/api';

const PER_PAGE = 12

const App = () => {
    const [photos, setPhotos] = useState<Photo[]>([])
    const [page, setPage] = useState<number>(1)
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
    const [albumId, setAlbumId] = useState<number | null>(null);

    useEffect(() => {
        getPhotos().then((data) => {
            setPhotos(data)
        })
    }, [])

    const filteredByAlbum = useMemo(() => {
        return photos.filter(({albumId: id}) => albumId ? albumId === id : true)
    }, [albumId, photos])

    const queriedPhotos = useMemo(() => {
        return photos
            .filter(({albumId: id}) => albumId ? albumId === id : true)
            .slice((page - 1) * PER_PAGE, PER_PAGE * page)

    }, [photos, page, albumId])

    const allAlbumIds = useMemo(() => {
        let result = new Set()

        photos.forEach(({id}) => result.add(id))

        return Array.from(result) as number[]
    }, [photos])

    const pagesCount = useMemo(() => {
        return Math.ceil(filteredByAlbum.length / PER_PAGE)
    }, [filteredByAlbum.length])

    const handleDelete = (photoId: number) => {
        if (queriedPhotos.length === 1) {
            setPage(Math.max(1, page - 1))
        }
        setPhotos(prev => {
            return prev.filter(({id}) => id !== photoId)
        })
    }

    const handleAlbumIdChange = (
        _: any,
        value: number | null
    ) => {
        setAlbumId(value)
    };

    return (
        <Container>
            <PhotoModal image={selectedPhoto} onClose={() => setSelectedPhoto(null)}/>
            <AlbumSelect
                // @ts-ignore
                onChange={handleAlbumIdChange}
                options={allAlbumIds}
            />
            <Grid container spacing={2}>
                {queriedPhotos.map(photo => (
                    <Grid key={crypto.randomUUID()} item xs={12} sm={6} md={3} lg={2}>
                        <Card sx={{maxWidth: 345}}>
                            <ButtonGroup style={{width: '100%'}} variant={'contained'} fullWidth>
                                <Button onClick={() => setSelectedPhoto(photo)}>view</Button>
                                <Button onClick={() => handleDelete(photo.id)}>delete</Button>
                            </ButtonGroup>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={photo.thumbnailUrl}
                                    alt={'photo'}
                                />
                                <CardContent>
                                    <Typography component="p" height={'100px'}>
                                        {photo.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
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