import React, { useState } from 'react';
import Modal from '../Modal/Modal';

import './ListItem.css';

const ListItem = ({ value, children }) => {

    const [modalActive, setModalActive] = useState(null);
    const [visibility, setVisibility] = useState(true);

    const openModal = (id) => {
        setModalActive(id);
    };

    const closeModal = () => {
        setModalActive(null);
    };

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    return (
        <li className="list-item">
            <div className="list-item-title" onClick={toggleVisibility}>
                {value}
                </div>
                {children && children.length > 0 && (
                    <ol className={"inner-list " + (visibility ? "active" : "")}>
                        {children.map(child => {
                            return (
                                <React.Fragment key={child.id}>
                                    <li onClick={() => openModal(child.id)}>
                                        {child.title}
                                    </li>
                                    <Modal closeHandler={closeModal} data={child} visible={modalActive === child.id}></Modal>
                                </React.Fragment>
                            )
                        })}
                    </ol>
                )}            
        </li>
    );
};

export default ListItem;
