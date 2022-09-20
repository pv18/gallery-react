import React, {useEffect, useMemo, useState} from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {IPhoto} from './types/shared';
import {Avatar, Button, ButtonGroup, CardHeader, IconButton, Pagination} from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {red} from '@mui/material/colors';

const PER_PAGE = 12

const App = () => {
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => setPhotos(data))
    }, [])

    const queriedPhotos = useMemo(() => {
        return [...photos].slice((page - 1) * 12, page * PER_PAGE)
    }, [photos, page])

    const handleDelete = (photoId: number) => {
        if (queriedPhotos.length === 1) {
            setPage(Math.min(1, page - 1))
        }
        setPhotos(prev => {
            return prev.filter(({id}) => id !== photoId)
        })
    }

    return (
        <Container>
            <Grid container spacing={1}>
                {queriedPhotos.map(photo => (
                    <Grid key={crypto.randomUUID()} item xs={4} md={3} lg={2}>
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
                                <Button>view</Button>
                                <Button onClick={() => handleDelete(photo.id)}>delete</Button>
                            </ButtonGroup>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Pagination
                onChange={(_, value) => setPage(value)}
                count={Math.floor(photos.length / PER_PAGE)}
                variant={'outlined'}
                shape={'rounded'}/>
        </Container>
    );
};

export default App;