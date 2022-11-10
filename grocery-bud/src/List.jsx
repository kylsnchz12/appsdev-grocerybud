import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const List = ({items, editItem}) => {
    return(
        <div className="item-container">
            {items.map((item) => {
            const { id, title } = item;
            return (
                <article className="grocery-list">
                    <p className="item-name">{title}</p>
                    <div>
                        <button 
                        className='edit-btn'
                        type='button'
                        onClick={ () => editItem(id)}
                        >
                            <FaEdit/>
                        </button>
                        <button className='delete-btn'>
                            <MdDelete/>
                        </button>
                    </div>
                </article>
            )
        })}
        </div>
    )
}

export default List;