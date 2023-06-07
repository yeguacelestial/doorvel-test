"use client"
import { useEffect, useState } from 'react';
import Card from './Card';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const LoadingContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
}));

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Simulating API call or data fetch
        const fetchData = async () => {
            setIsLoading(true);
            // Simulating a delay
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Mock response data
            const mockData = [
                { imageSrc: 'house.jpg', title: 'Card 1' },
                { imageSrc: 'house.jpg', title: 'Card 2' },
                { imageSrc: 'house.jpg', title: 'Card 3' },
                { imageSrc: 'house.jpg', title: 'Card 4' },
                { imageSrc: 'house.jpg', title: 'Card 5' },
                { imageSrc: 'house.jpg', title: 'Card 6' },
                { imageSrc: 'house.jpg', title: 'Card 7' },
                { imageSrc: 'house.jpg', title: 'Card 8' },
                { imageSrc: 'house.jpg', title: 'Card 9' },
                // Add more data as needed
            ];
            setCards((prevCards) => [...prevCards, ...mockData]);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollHeight - scrollTop === clientHeight) {
            // Reached the bottom of the scroll container, fetch more data here
            // You can modify this logic to fetch more cards from an API endpoint
            // For this example, we'll simulate loading more data after a delay
            setIsLoading(true);
            // Simulating a delay
            setTimeout(() => {
                const newData = [
                    { imageSrc: 'house.jpg', title: 'Card 10' },
                    { imageSrc: 'house.jpg', title: 'Card 11' },
                    { imageSrc: 'house.jpg', title: 'Card 12' },
                ];
                setCards((prevCards) => [...prevCards, ...newData]);
                setIsLoading(false);
            }, 2000);
        }
    };

    return (
        <div style={{ height: '78vh', overflowY: 'scroll', paddingTop: "50px", marginLeft: "8vw" }} onScroll={handleScroll}>
            <Grid container spacing={1} columnSpacing={0.5}>
                {cards.map((card, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <Card imageSrc={card.imageSrc} title={card.title} />
                    </Grid>
                ))}
            </Grid>
            {isLoading && (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )}
        </div>
    );
};

export default Cards;
