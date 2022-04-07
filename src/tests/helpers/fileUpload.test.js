import 'setimmediate';
import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'day1l2jjt', 
    api_key: '642243343215854', 
    api_secret: '5uehmRImp5-7bh7qD2StkBIxnQ0',
    secure: true
});

describe('pruebas en fileUpload', () => {
    // test('debe cargar archivo y cargar url',async (done) => {
    //     const response = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
    //     const blob = await response.blob();
    //     const file = new File([blob], 'foto.png');
    //     const url = await fileUpload(file);

    //     expect(typeof url).toBe('string');

    //     const segments = url.split('/')
    //     const imageId = segments[segments.length -1].replace('.png','')
    //     cloudinary.v2.api.delete_resources(imageId, {}, () => {done});
    // },10000);
    test('debe cargar archivo y no cargar url',async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file)

        expect(url).toBe(null);
    });
});