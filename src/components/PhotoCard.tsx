import React, {useContext} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Photo} from '../types/shared';
import {PhotoContext} from '../context/PhotoContext';

type Props = {
    photo: Photo,
}

export const PhotoCard = ({photo}: Props) => {
    const {setSelectedPhoto, deletePhoto} = useContext(PhotoContext)
    return (
        <Grid key={crypto.randomUUID()} item xs={12} sm={6} md={3} lg={2}>
            <Card
                style={{
                    height: '100%',
                }}
            >
                <ButtonGroup style={{width: '100%'}} variant={'contained'} fullWidth>
                    <Button onClick={() => setSelectedPhoto(photo)}>view</Button>
                    <Button onClick={() => deletePhoto(photo.id)}>delete</Button>
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
    );
};

