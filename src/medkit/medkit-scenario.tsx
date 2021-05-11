import React from 'react';

export const Medkit1Scenario: React.FC = () => {
    return(<>
        Create a medical kit for a ski mountaineering expedition. You’ll be a
        leading a group of 10 participants on a four-day trip which will
        include skiing, snowshoeing, ice climbing and glacier travel in a
        remote alpine environment. Your med kit will have to fit in the gear
        that you carry over the mountain. Your high alpine campsite is at
        12,000 feet. The trailhead is at 5,000 feet approximately 5 miles from
        the high camp. You have 80 total points to spend.
    </>);
};

export const Medkit2Scenario: React.FC = () => {
    return (<>
        You&apos;re the doctor for a 10-person group that will bike and camp
        the <a target={'_blank'} rel={'noreferrer'} href={'https://bikepacking.com/routes/kokopelli-trail-bikepacking-route/'}>
        Kokopelli Trail</a> from Fruita, Colorado
        to <a target={'_blank'} rel={'noreferrer'} href={'https://www.utahmountainbiking.com/trails/kokopelli.htm'}>Moab, Utah</a>.
        The territory is hot and dry and the group will be making camp with the
        help of support vehicles that carry your overnight supplies. While
        riding, the group is isolated and your medical kit will need to travel
        on your back. The total trip is 158 miles and will take four days.
        Evacuation from the route could take many hours depending on location.
        Space and weight are a premium here; you have 65 points to spend.
    </>);
};

export const Medkit3Scenario: React.FC = () => {
    return (<>
        You&apos;re leading a team to set up a field hospital
        after a magnitude 8.0 earthquake in El Salvador. It’s an urban, tropical
        setting with mostly devastated infrastructure. Your medical kit will travel
        with equipment and luggage, so can be larger — a maximum of 90 points. It must
        be suitable for international travel. <span className={'fw-bold'}>Note: this kit
        is intended to care for your team of providers, not the patients at the field
        hospital.</span>
    </>);
};
