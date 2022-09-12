import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {IPhoto} from './types/shared';


const App = () => {
    const [photos, setPhotos] = useState<IPhoto[]>([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => setPhotos(data))
    }, [])

    return (
        <Container>
            <Grid container spacing={1}>
                {photos.map(photo => (
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
                                    <Typography gutterBottom variant="h5" component="div">
                                        {photo.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default App;