import React from 'react';
import { Logo } from '../logo';
import MedkitImg from '../images/iStock-1217277545.jpg';
import TriageImg from '../images/iStock-1217878707.jpg';

interface PromoCardProps {
    title: string;
    text: string;
    linkUrl: string;
    imgUrl: string;
    disable: boolean;
}

const PromoCard: React.FC<PromoCardProps> = (
    {title, text, linkUrl, imgUrl, disable}: PromoCardProps) => {
    return (
        <div className="col-6">
            <div className="card shadow-sm">
                <a href={linkUrl}>
                    <img src={imgUrl}
                        alt={title}
                        className={'bg-placeholder-img card-img-top'}
                        role="img"
                        aria-label={title}/>
                </a>
                <div className="card-body">
                    <span className="h3 d-block">{title}</span>
                    <p className="card-text">
                        {text}
                    </p>
                    <a href={disable ? '#' : linkUrl}
                        className={
                            'btn btn-lg btn-danger ' + (disable ? 'disabled' : '')}>
                        {disable ? 'Coming Soon' : 'Begin'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export const Home: React.FC = () => {
    const sims: PromoCardProps[]  = [
        {
            title: 'Medical Kit Simulation',
            // eslint-disable-next-line max-len
            text: '',
            linkUrl: '/medkit',
            imgUrl: MedkitImg,
            disable: false
        },
        {
            title: 'Patient Triage Simulation',
            // eslint-disable-next-line max-len
            text: '',
            linkUrl: '/triage',
            imgUrl: TriageImg,
            disable: true
        }
    ];

    return (
        <>
            <div className="am__hero">
                <div className={'container py-5'} data-testid='home'>
                    <div className="row justify-content-center py-5">
                        <div className="col-12 col-md-8 am__hero-col">
                            <Logo />
                            <span className={'h1 display-5 fw-bold text-white'}>
                                VIRTUAL SIMULATIONS
                            </span>
                            <p className={'fs-5 text-white text-center'}>
                                Experience digital teaching tools for medical
                                care wilderness and disaster environments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="am__sim-promo-block py-5">
                <div className="container py-5">
                    <div className="row py-5">
                        {sims.map((el, idx) => {
                            return (
                                <PromoCard
                                    key={idx}
                                    title={el.title}
                                    text={el.text}
                                    linkUrl={el.linkUrl}
                                    imgUrl={el.imgUrl}
                                    disable={el.disable}/>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="am__hp-footer">
                <div className="container py-5">
                    <div className="row py-5">
                        <div className="col-4">
                            <span className="h2 d-block">About</span>
                            <p>
                            </p>
                        </div>
                        <div className="col-4">
                            <span className="h2 d-block">Partners</span>
                            <p>
                            </p>
                        </div>
                        <div className="col-4">
                            <span className="h2 d-block"></span>
                            <p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
