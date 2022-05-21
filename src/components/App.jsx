import { useEffect, useState } from 'react';
import s from './App.module.css';
import getImages from './Api/api';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default function App() {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [page, setPage] = useState(1);
  const [isShown, setIsShown] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (title === '') {
      return
    };
    setEnabled(true);
      getImages(title, page)
        .then(images => {
          setImages(prev => [...prev, ...images]);
          }).finally(() => setEnabled(false));
    }, [title, page])   

  const handleFormSubmit = title => {
    setTitle(title);
    setPage(1);
    setImages([]);
  };
  
  const handleBtnClick = () => {
   setPage(prev => prev + 1)
  }

  const toggleModal = () => {
    setIsShown(prev => !prev)
  }
  
  const openImage = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  }
  
  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit}/>
      {page === 1 && <Loader enabled={enabled} />}
      {images && <ImageGallery images={images} alt={title} onClick={openImage}/>}    
      {page > 1 && <Loader enabled={enabled} />}
      {images && images.length > 0 && <Button onClick={handleBtnClick} />}
      {isShown && <Modal isShown={toggleModal} src={largeImageURL} alt={title}/>}
    </div>
  );
}