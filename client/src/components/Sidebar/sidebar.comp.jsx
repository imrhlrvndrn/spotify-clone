import React, { useState } from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { useWindowResize } from '../../utils';

// Styled components
import { SidebarContainer } from './sidebar.styles';

// React icons
import spotifyLogo from '../../react_icons/Spotifylogo.png';
import {
    ActiveHomeIcon,
    ActiveLibraryIcon,
    ActiveSearchIcon,
    HomeIcon,
    LibraryIcon,
    SearchIcon,
} from '../../react_icons';

// React components
import { SidebarItems, SidebarOptions } from '../';

export const Sidebar = () => {
    const [{ playlists }, dispatch] = useDataLayerValue();
    const windowSize = useWindowResize();
    const windowSizeCalc = windowSize.width >= 1024;

    const sidebar_options = [
        {
            name: 'Home',
            link: '/',
            is_active: true,
            icon: { default: HomeIcon, active: ActiveHomeIcon },
        },
        {
            name: 'Search',
            link: '/search',
            is_active: false,
            icon: { default: SearchIcon, active: ActiveSearchIcon },
        },
        {
            name: 'Library',
            link: '/library/playlists',
            is_active: false,
            icon: { default: LibraryIcon, active: ActiveLibraryIcon },
        },
    ];
    const [sidebarOptions, setSidebarOptions] = useState(sidebar_options);

    const renderSidebarOptions = (options) => {
        return options?.map((option) => (
            <SidebarOptions
                key={option?.link}
                option={{
                    ...option,
                    onClick: () =>
                        setSidebarOptions((prevState) =>
                            prevState?.map((item) =>
                                option?.name === item?.name
                                    ? { ...item, is_active: true }
                                    : { ...item, is_active: false }
                            )
                        ),
                }}
            />
        ));
    };

    console.log('Sidebar Options => ', sidebarOptions);

    return (
        <>
            <SidebarContainer>
                {windowSizeCalc && <img src={spotifyLogo} alt='spotify logo' />}
                <SidebarItems>{renderSidebarOptions(sidebarOptions)}</SidebarItems>
                {windowSizeCalc && (
                    <SidebarItems title='playlists'>
                        {playlists?.length > 0 ? (
                            playlists?.map((playlist) => {
                                return (
                                    <SidebarOptions
                                        option={{
                                            link: `/playlist/${playlist?.id}`,
                                            name: playlist?.name,
                                            onClick: () =>
                                                dispatch({
                                                    type: 'SET_MEDIA_ID',
                                                    media_id: playlist?.id,
                                                }),
                                        }}
                                    />
                                );
                            })
                        ) : (
                            <SidebarOptions option={{ name: 'No playlists' }} />
                        )}
                    </SidebarItems>
                )}
            </SidebarContainer>
        </>
    );
};
