import React, { useState, useContext } from 'react'
import bemCssModules from 'bem-css-modules'

import Modal from '../Modal/Modal'
import { StoreContext } from '../../store/StoreProvider';
import request from '../../helpers/request';

import { default as LoginFormStyles } from './LoginForm.module.scss';

const style = bemCssModules(LoginFormStyles);

const LoginForm = (handleOnClose, isModalOpen) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const [validateMessage, setValidateMessage] = useState('')

    const { setUser } = useContext(StoreContext);

    const handleOnChangeLogin = ({ target: { value } }) => setLogin(value)
    const handleOnChangePassword = ({ target: { value } }) => setPassword(value)
    const handleOnCloseModal = event => {
        event.preventDefault();
        handleOnClose();
    }

    const resetStateOfInput = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    }

    const handleOnSubmit = async event => {
        event.preventDefault();
        const { data, status } = await request.post('/users',
            { login, password });

        if (status === 200) {
            setUser(data.user);
            resetStateOfInput();
            handleOnClose();
        } else {
            setValidateMessage(data.message);
        }
    }

    const validateMessageComponent = validateMessage.length
        ? <p className={style('validate-message')}>{validateMessage}</p>
        : null;

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOnOutsideClick={true}>
            {validateMessageComponent}
            <form className={style()} method="post" onSubmit={handleOnSubmit}>
                <div className={style('row')}>
                    <label>
                        <input onChange={handleOnChangeLogin} type="text" value={login} />
                    </label>
                </div>
                <div className={style('row')}>
                    <label>
                        <input onChange={handleOnChangePassword} type="password" value={password} />
                    </label>
                </div>
                <div className={style('row')}>
                    <button type="submit">Zaloguj</button>
                    <button onClick={handleOnCloseModal} type="button">Anuluj</button>
                </div>
            </form>
        </Modal>
    );
};

export default LoginForm