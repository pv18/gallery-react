import React from 'react';
import {Photo} from '../types/shared';
import Grid from '@mui/material/Grid';
import {PhotoCard} from './PhotoCard';

type Props = {
    photos: Photo[],
}

export const PhotoList = ({photos}: Props) => {
    return (
        <Grid container spacing={2} style={{marginBottom:'20px'}}>
            {photos.map(photo => (
                <PhotoCard key={photo.id} photo={photo}/>
            ))}
        </Grid>
    );
};

