import React, {useEffect, useMemo, useState} from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {IPhoto} from './types/shared';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {
    Autocomplete, autocompleteClasses,
    Avatar,
    Button,
    ButtonGroup,
    CardHeader,
    IconButton,
    Pagination,
    Popper, styled,
    TextField
} from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {red} from '@mui/material/colors';
import ImageModal from './components/ImageModal';
import AlbumSelect from './components/AlbumSelect';

const PER_PAGE = 12

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});

const App = () => {
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [page, setPage] = useState<number>(1)
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null)
    const [albumId, setAlbumId] = useState<number | null>(null);


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => setPhotos(data))
    }, [])

    const queriedPhotos = useMemo(() => {
        let result: IPhoto[] = []

        for (let i = 0; i < photos.length; i++) {
            if (!albumId) result.push(photos[i])
            if (photos[i].albumId === albumId) result.push(photos[i])
            if (result.length >= 10) return result
        }

        return result
    }, [photos, page])

    const allAlbumIds = useMemo(() => {
        let result = new Set()

        photos.forEach(({id}) => result.add(id))

        return Array.from(result) as number[]
    }, [photos])

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
            <ImageModal image={selectedPhoto} onClose={() => setSelectedPhoto(null)}/>
            <AlbumSelect
                // @ts-ignore
                onChange={handleAlbumIdChange}
                options={allAlbumIds}
            />
            <Grid container spacing={2}>
                {queriedPhotos.map(photo => (
                    <Grid key={crypto.randomUUID()} item xs={12} sm={6} md={3} lg={2}>
                        <Card sx={{maxWidth: 345}}>
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
                            <ButtonGroup style={{width: '100%'}} variant={'contained'} fullWidth>
                                <Button onClick={() => setSelectedPhoto(photo)}>view</Button>
                                <Button onClick={() => handleDelete(photo.id)}>delete</Button>
                            </ButtonGroup>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                page={page}
                onChange={(_, value) => setPage(value)}
                count={Math.ceil(photos.length / PER_PAGE)}
                variant={'outlined'}
                shape={'rounded'}/>
        </Container>
    );
};

export default App;