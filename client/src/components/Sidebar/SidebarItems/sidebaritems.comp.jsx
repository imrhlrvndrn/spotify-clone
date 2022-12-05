import React from 'react';
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../../DataLayer';

// Styled components
import { SidebarItemsContainer } from './sidebaritems.styles';

export const SidebarOptions = ({ option }) => {
    const { link = '', name, icon, onClick, is_active } = option;
    const [ActiveIcon, DefaultIcon] = [icon?.active, icon?.default];
    const has_icon = icon?.default;

    const renderIcon = () => {
        if (has_icon) {
            if (is_active) return <ActiveIcon className='sidebarItems__icon' />;
            else return <DefaultIcon className='sidebarItems__icon' />;
        }
    };

    return (
        // <div className='sidebar-item-list-item'>
        <Link
            to={link}
            className={`sidebarItems ${is_active && 'active'}`}
            onClick={() => onClick()}
        >
            {/* {has_icon && is_active ? (
                <ActiveIcon className='sidebarItems__icon' />
            ) : (
                <DefaultIcon className='sidebarItems__icon' />
            )} */}
            {renderIcon()}
            {has_icon ? (
                <h4 className='sidebarItems__option'>{name}</h4>
            ) : (
                <p className='sidebarItems__option'>{name}</p>
            )}
        </Link>
        // {/* </div> */}
    );
};

export const SidebarItems = ({ title, children }) => {
    return (
        <SidebarItemsContainer>
            {title && <h1 className='sidebarItems__title'>{title}</h1>}
            {children}
        </SidebarItemsContainer>
    );
};
