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
                {disable ? (
                    <img src={imgUrl}
                        alt={title}
                        className={'bg-placeholder-img card-img-top'}
                        role="img"
                        aria-label={title}/>
                ) : (
                    <a href={linkUrl}>
                        <img src={imgUrl}
                            alt={title}
                            className={'bg-placeholder-img card-img-top'}
                            role="img"
                            aria-label={title}/>
                    </a>
                )}
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
            text: 'It pays to be prepared for a crisis in the field but you can’t take it all with you What will you take with you? What must you leave behind?',
            linkUrl: '/medkit',
            imgUrl: MedkitImg,
            disable: false
        },
        {
            title: 'Patient Triage Simulation',
            // eslint-disable-next-line max-len
            text: 'An outbreak situation has created a crisis in an urban hospital system. Can you work fast and dilligently enough to meet your patients’ needs?',
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
                                The Austere Medicine initiative is a positive
                                environment for a community of final-year
                                medical students to learn about medical care in
                                resource-limited settings, including wilderness and
                                disaster environments.
                            </p>
                            <a href={'/about'} className={'btn btn-danger'}>More</a>
                        </div>
                        <div className="col-4">
                            <span className="h2 d-block">Partners</span>
                            <p>
                                This project is a joint collaboration between
                                CUIMC and CTL with additional support from the
                                Columbia Office of the VPTLI.
                            </p>
                        </div>
                        <div className="col-4">
                            <span className="h2 d-block">Contact</span>
                            <p>
                                Please reach out for bugs, questions, or more
                                information about the project.
                            </p>
                            <a href={'mailto:ctl-austeremedicine@columbia.edu'}
                                className={'btn btn-danger'}>
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
