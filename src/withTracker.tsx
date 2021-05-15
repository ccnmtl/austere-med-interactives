/* eslint-disable */
/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, { useEffect  } from 'react';
import ReactGA, { FieldsObject  } from 'react-ga';
import { RouteComponentProps  } from 'react-router-dom';

const GA_TRACKING_ID = 'UA-51144540-39'

ReactGA.initialize(GA_TRACKING_ID);

export const withTracker = <P extends RouteComponentProps>(
    WrappedComponent: React.ComponentType<P>,
    options: FieldsObject = {},
    ) => {

    const trackPage = (page: string) => {
        ReactGA.set({ page, ...options  });
        ReactGA.pageview(page);
    };

    return (props: P) => {
        useEffect(() => {
            trackPage(window.location.pathname);
        }, [window.location.pathname]);

        return <WrappedComponent {...props} />;
    };
}
