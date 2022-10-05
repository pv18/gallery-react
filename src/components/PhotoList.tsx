import React from 'react';
import {Photo} from '../types/shared';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type Props = {
    photos: Photo[],
    handleSelectPhoto: (photo: Photo) => void,
    handleDeletePhoto: (id: number) => void
}

export const PhotoList = ({photos, handleDeletePhoto, handleSelectPhoto}: Props) => {
    return (
        <Grid container spacing={2} style={{marginBottom:'20px'}}>
            {photos.map(photo => (
                <Grid key={crypto.randomUUID()} item xs={12} sm={6} md={3} lg={2}>
                    <Card sx={{maxWidth: 345}}>
                        <ButtonGroup style={{width: '100%'}} variant={'contained'} fullWidth>
                            <Button onClick={() => handleSelectPhoto(photo)}>view</Button>
                            <Button onClick={() => handleDeletePhoto(photo.id)}>delete</Button>
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
    );
};

