"use client"
import { useContext, useEffect, useState } from 'react';
import ChildAmmenity from './ChildAmmenity';
import FloatingCard from './FloatingCard';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

import { AmmenitiesContext } from './AmmenitiesContext';
import childrenAmmenities from '@/dummy/childrenAmmenities';

const LoadingContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
}));

const ChildrenAmmenitiesList = () => {
    const [openModal, setOpenModal] = useState(false);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const { selectedParent } = useContext(AmmenitiesContext)
    const { filteredCards, setFilteredCards } = useState(cards.filter(card => {
        return card.property_category == selectedParent.id
    }))


    const handleOpenModal = () => setOpenModal(true);

    useEffect(() => {
        // Simulating API call or data fetch
        const fetchData = async () => {
            setIsLoading(true);
            // Simulating a delay
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const mockData = [
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 1', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 2', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 3', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 4', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 5', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 6', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 7', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 8', description: 'Description for card' },
                { imageSrc: 'house.jpg', title: 'ChildAmmenity 9', description: 'Description for card' },
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
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 10', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 11', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 12', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 13', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 14', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 15', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 16', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 17', description: 'Description for card' },
                    { imageSrc: 'house.jpg', title: 'ChildAmmenity 18', description: 'Description for card' },
                ];
                setCards((prevCards) => [...prevCards, ...newData]);
                setIsLoading(false);
            }, 2000);
        }
    };

    return (
        <div style={{ height: '78vh', overflowY: 'scroll', paddingTop: "50px", marginLeft: "8vw" }} onScroll={handleScroll}>
            <Grid container spacing={1} columnSpacing={0.5}>
                {filteredCards.map((card, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <ChildAmmenity imageSrc={card.imageSrc} title={card.title} onClick={() => {
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

export default ChildrenAmmenitiesList;
