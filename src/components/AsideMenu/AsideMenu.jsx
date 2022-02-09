import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import AdminMenu from './subcomponents/AdminMenu';
import UserMenu from './subcomponents/UserMenu';

import { default as AsideMenuStyles } from './AsideMenu.module.scss';
import { StoreContext } from '../../store/StoreProvider';

const style = bemCssModules(AsideMenuStyles);

const AsideMenu = () => {
    const { user } = useContext(StoreContext)

    const ADMIN_TYPE = 1;

    const adminMenuComponent = user?.accessLevel === ADMIN_TYPE
        ? <AdminMenu />
        : null;

    return (
        <section className={style()}>
            <UserMenu isLoginLogged={Boolean(user)} />
            {adminMenuComponent}
        </section>
    )
}

export default AsideMenu