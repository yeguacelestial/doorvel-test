import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 300,
    marginBottom: theme.spacing(2),
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: 200,
}));

const ChildAmmenity = ({ imageSrc, title, onClick }) => {
    return (
        <div onClick={onClick}>
            <StyledCard>
                <StyledCardMedia image={imageSrc} title={title} />
                <CardContent>
                    <Typography variant="h6">{title}</Typography>
                </CardContent>
            </StyledCard>
        </div>
    );
};

export default ChildAmmenity;