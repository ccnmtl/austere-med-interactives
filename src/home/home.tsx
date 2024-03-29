import React from 'react';
import { Logo } from '../logo';
import MedkitImg from '../images/iStock-1217277545.jpg';
import TriageImg from '../images/iStock-1217878707.jpg';
import CUIMCLogo from '../images/logo-black-cuimc.svg';
import CTLLogo from '../images/logo-black-ctl.svg';
import VPTLILogo from '../images/logo-black-vptli.svg';
import EMLogo from '../images/logo-black-emergency.svg';

interface PromoCardProps {
    title: string;
    text: string;
    linkUrl: string;
    imgUrl: string;
}

const PAGE_TITLE = 'Austere Medicine Virtual Simulations';

const PromoCard: React.FC<PromoCardProps> = (
    {title, text, linkUrl, imgUrl}: PromoCardProps) => {
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
                    <a href={linkUrl}
                        className={
                            'btn btn-lg btn-danger'}>
                        <span aria-hidden={true}>Begin</span>
                        <span className={'sr-only'}>
                            Begin {title}
                        </span>
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
            text: 'It pays to be prepared for a crisis in the field but you can’t take it all with you. What will you take with you? What must you leave behind?',
            linkUrl: '/medkit',
            imgUrl: MedkitImg,
        },
        {
            title: 'Patient Triage Simulation',
            // eslint-disable-next-line max-len
            text: 'An outbreak situation has created a crisis in an urban hospital system. Can you work fast and dilligently enough to meet your patients’ needs?',
            linkUrl: '/triage',
            imgUrl: TriageImg,
        }
    ];

    React.useEffect(() => {
        document.title = PAGE_TITLE;
    });

    return (
        <>
            <div className="am__hero">
                <div className={'container py-5'} data-testid='home'>
                    <div className="row">
                        <div className="col-12">
                            <a className={'btn sr-only sr-only-focusable'} href={'#intro'}>Skip</a>
                        </div>
                    </div>
                    <div className="row justify-content-center py-5">
                        <div className="col-12 col-md-8 am__hero-col">
                            <h1 className={'sr-only'}>{PAGE_TITLE}</h1>
                            <Logo />
                            <span className={'h1 display-5 fw-bold text-white'} aria-hidden={true}>
                                VIRTUAL SIMULATIONS
                            </span>
                            <p id={'intro'} className={'fs-5 text-white text-center'}>
                                The Austere Medicine initiative is a positive
                                environment for a community of final-year
                                medical students to learn about medical care in
                                resource-limited settings, including wilderness and
                                disaster environments.
                            </p>
                            <p>
                                <a href="/about" className={'btn btn-lg btn-light'}>
                                    Learn More
                                </a>
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
                                    imgUrl={el.imgUrl}/>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="am__hp-footer">
                <div className="container py-5">
                    <div className="row py-5">
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center fw-bold">
                                    This project is a joint collaboration of the
                                    following institutions:
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <a href={'https://www.cuimc.columbia.edu/'}>
                                        <img src={CUIMCLogo}
                                            alt={'Columbia University Irving Medical Center'}
                                            className={'img-fluid mb-2'} />
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href={'https://www.emergencymedicine.columbia.edu/'}>
                                        <img src={EMLogo}
                                            alt={
                                                'Columbia University Irving Medical Center ' +
                                                'Department of Emergency Medicine'}
                                            className={'img-fluid'} />
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href={'https://www.ctl.columbia.edu/'}>
                                        <img src={CTLLogo}
                                            alt={
                                                'Columbia University ' +
                                                'Center for Teaching and Learning'}
                                            className={'img-fluid'}/>
                                    </a>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 text-center fw-bold">
                                    This project was made possible with generous support from:
                                </div>
                                <div className="col-md-4">
                                    <a href={'https://www.vptli.columbia.edu/'}>
                                        <img
                                            src={VPTLILogo}
                                            alt={
                                                'Columbia University ' +
                                                'Office of the Vice President for ' +
                                                'Teaching, Learning, and Innovation'}
                                            className={'img-fluid'} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
