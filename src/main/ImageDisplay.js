import React from 'react'

export default function ImageDisplay(props) {

    function generateImages() {
        let cando = true;
        try {
            console.log(props.images[0].image)
        } catch (error) {
            cando = false;
        }

        if (cando) {
            return props.images.map(pic => <img
                className='sidebar-image'
                src={pic.image}
                alt='Property'
                width='145'
                height='105'
            />
            );
        }

    }

    return (
        <div id='images'>
            {generateImages()}
        </div>
    )

}