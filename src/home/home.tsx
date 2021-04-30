import React from 'react';
import { Logo } from '../logo';
import MedkitImg from '../images/iStock-1217277545.jpg';
import TriageImg from '../images/iStock-1217878707.jpg';

interface PromoCardProps {
    title: string;
    text: string;
    linkUrl: string;
    imgUrl: string;
}

const PromoCard: React.FC<PromoCardProps> = ({title, text, linkUrl, imgUrl}: PromoCardProps) => {
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
                    <a href={linkUrl} className={'btn btn-lg btn-danger'}>Begin</a>
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
            text: 'Sed at nulla rutrum, malesuada elit eu, vehicula purus. Vestibulum convallis accumsan eros, in pharetra leo blandit non.',
            linkUrl: '/medkit',
            imgUrl: MedkitImg
        },
        {
            title: 'Patient Outbreak Simulation',
            // eslint-disable-next-line max-len
            text: 'Sed at nulla rutrum, malesuada elit eu, vehicula purus. Vestibulum convallis accumsan eros, in pharetra leo blandit non.',
            linkUrl: '/triage',
            imgUrl: TriageImg
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
                                Lorem ipsum dolor sit amet.
                            </span>
                            <p className={'fs-5 text-white text-center'}>
                                A better, longer description goes here. Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Suspendisse vel erat non ex mollis
                                placerat ac vitae metus. Mauris commodo nec
                                erat ut ultricies. Sed at nulla rutrum,
                                malesuada elit eu, vehicula purus. Vestibulum
                                convallis accumsan eros, in pharetra leo
                                blandit non. In vitae elementum nisi.
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
                        <div className="col-4">
                            <span className="h2 d-block">Featured Title</span>
                            <p>
                                Paragraph of text beneath the heading to
                                explain the heading. We&apos;ll add onto it with
                                another sentence and probably just keep going
                                until we run out of words.
                            </p>
                        </div>
                        <div className="col-4">
                            <span className="h2 d-block">Featured Title</span>
                            <p>
                                Paragraph of text beneath the heading to
                                explain the heading. We&apos;ll add onto it with
                                another sentence and probably just keep going
                                until we run out of words.
                            </p>
                        </div>
                        <div className="col-4">
                            <span className="h2 d-block">Featured Title</span>
                            <p>
                                Paragraph of text beneath the heading to
                                explain the heading. We&apos;ll add onto it with
                                another sentence and probably just keep going
                                until we run out of words.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
