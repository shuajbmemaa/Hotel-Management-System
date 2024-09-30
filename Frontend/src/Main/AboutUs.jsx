import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHotel, FaConciergeBell, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../Layout/Navbar';

const Container = styled.div`
    padding: 40px 20px;
    margin: 0 auto;
    max-width: 1800px;
    font-family: 'Arial', sans-serif;
    line-height: 1.5;
    // background: linear-gradient(to right, #ffecd2, #fcb69f);
    background-color: #fff; /* Ngjyra e bardhë e pastër */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    color: #2c3e50;
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    background-color: #FF5F1F;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1em;
    // transition: background-color 0.3s, transform 0.3s;

    // &:hover {
    //     background-color: #ffecd2;
    //     transform: scale(1.05);
    }
`;

const Title = styled.h1`
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 3em;
    font-family: 'Georgia', serif;
    position: relative;

    &::after {
        content: '';
        width: 80px;
        height: 4px;
        background: #2c3e50;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -10px;
    }
`;

const Paragraph = styled.p`
    text-align: justify;
    margin-bottom: 20px;
    font-size: 1.2em;
`;

const Image = styled.img`
    display: block;
    margin: 20px auto;
    max-width: 70%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 40px 0;
`;

const IconBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #2c3e50;

    svg {
        font-size: 3em;
        margin-bottom: 10px;
    }

    &:hover {
        color: #FF5F1F;
        svg {
            transform: scale(1.1);
            transition: transform 0.2s;
        }
    }
`;

const AboutUs = () => {
    return (
        <>
            <Navbar/>
            <Container>
                <Title>Rreth Nesh</Title>
                <Image src="https://miro.medium.com/v2/resize:fit:2000/1*cfuAGisqyGTvlGVaaEMVzw.png" alt="Hotel Lotus" />
                <Paragraph>
                    Mirësevini në Hotel Lotus, një vend ku komoditeti dhe luksusi bashkohen për të ofruar një përvojë të paharrueshme. Ne jemi të përkushtuar të ofrojmë shërbime të shkëlqyera dhe të sigurojmë që çdo moment i qëndrimit tuaj të jetë i mbushur me kënaqësi dhe relaks.
                </Paragraph>
                <Paragraph>
                    Hotel Lotus ndodhet në zemër të qytetit, duke ofruar qasje të lehtë në atraksionet kryesore dhe bizneset lokale. Me dhoma të dizajnuara me kujdes dhe ambiente të sofistikuara, ne jemi destinacioni ideal për udhëtarët e biznesit dhe të pushimeve.
                </Paragraph>
                <Paragraph>
                    Stafi ynë mikpritës dhe profesionist është gjithmonë në dispozicion për të siguruar që ju të ndiheni si në shtëpi. Ju faleminderit që zgjodhët Hotel Lotus për qëndrimin tuaj. Ne presim me kënaqësi t'ju mirëpresim!
                </Paragraph>
                <IconContainer>
                    <IconBox>
                        <FaHotel />
                        <span>Akomodime Luksoze</span>
                    </IconBox>
                    <IconBox>
                        <FaConciergeBell />
                        <span>Shërbim 24/7</span>
                    </IconBox>
                    <IconBox>
                        <FaMapMarkerAlt />
                        <span>Vendndodhje e Përsosur</span>
                    </IconBox>
                </IconContainer>
            </Container>
        </>
    );
};

export default AboutUs;
