import { Component } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(
    private _imagePicker: ImagePicker,
    private _crop: Crop,
    private _webView: WebView,
    private _file: File
  ) {
  }

  public picturePath = '';
  public pictureCropedPath = '';
  public pictureCropedPathConvertedSrc = '';
  public picturePathConverdSrc = '';
  public pictureEncodedBase64 = '';

  public function;
  public async selectImage(): Promise<void> {
    let images = [];
    const imagePickerOptions: ImagePickerOptions = {
      maximumImagesCount: 1
    };

    try {
      images = await this._imagePicker.getPictures(imagePickerOptions);
      console.log('images', images);
      if (images.length) {
        this.picturePath = images[0];
        this.picturePathConverdSrc = this._webView.convertFileSrc(this.picturePath);
        this.pictureCropedPath = await this._crop.crop(this.picturePath, { quality: 100, targetWidth: 100, targetHeight: 100 });
        this.pictureCropedPathConvertedSrc = this._webView.convertFileSrc(this.pictureCropedPath);
        this.pictureEncodedBase64 = await this.getBase64(this.pictureCropedPath);
      }
    } catch (error) {
      console.log('caiu aq', error);
      console.log(error);
    }
  }

  public async getBase64(pictureCropedPath) {
    const directory = pictureCropedPath.substring(0, pictureCropedPath.lastIndexOf('/'));
    const filename = pictureCropedPath.substring(pictureCropedPath.lastIndexOf('/') + 1);
    return await this._file.readAsDataURL(directory + '/', filename.split('?')[0]);
  }
}
