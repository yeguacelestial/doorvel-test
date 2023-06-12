"use client"
import { useEffect, useState } from 'react';
import Card from './Card';
import FloatingCard from './FloatingCard';
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
    const [openModal, setOpenModal] = useState(false);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const handleOpenModal = () => setOpenModal(true);

    useEffect(() => {
        // Simulating API call or data fetch
        const fetchData = async () => {
            setIsLoading(true);
            // Simulating a delay
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const mockData = [
                { imageSrc: 'house.jpg', title: 'Card 1', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'Card 2', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'Card 3', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'Card 4', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'Card 5', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'Card 6', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'Card 7', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'Card 8', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'Card 9', description: 'Description for card' },
            ];
            setCards((prevCards) => [...prevCards, ...mockData]);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollHeight - scrollTop === clientHeight) {
            setIsLoading(true);
            // Simulating a delay
            setTimeout(() => {
                const newData = [
                    { imageSrc: 'house.jpg', title: 'Card 10', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'Card 11', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'Card 12', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'Card 13', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'Card 14', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'Card 15', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'Card 16', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'Card 17', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'Card 18', description: 'Description for card' },
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
                        <Card imageSrc={card.imageSrc} title={card.title} onClick={() => {
                            handleOpenModal()
                            setSelectedCard(card)
                        }} />
                    </Grid>
                ))}
            </Grid>

            <FloatingCard
                title={selectedCard.title}
                description={selectedCard.description}
                open={openModal}
                setOpen={setOpenModal}
                handleOpen={handleOpenModal}
            />
            {isLoading && (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )}
        </div>
    );
};

export default Cards;
