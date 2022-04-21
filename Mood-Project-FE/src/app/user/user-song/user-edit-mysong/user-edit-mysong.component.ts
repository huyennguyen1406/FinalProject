import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from "rxjs";
declare var Swal: any;

@Component({
  selector: 'app-user-edit-mysong',
  templateUrl: './user-edit-mysong.component.html',
  styleUrls: ['./user-edit-mysong.component.css']
})
export class UserEditMysongComponent implements OnInit {

  id: number;
  songForm: FormGroup;
  message = '';
  song: Song;
  avatarUrlSong: string;
  mp3UrlSong: string;
  selectImg: any = null;
  selectFile: any = null;

  downloadImgURL?: Observable<string>;
  downloadAudURL?: Observable<string>;

  constructor(private formBuilder: FormBuilder,
              private songService: SongService,
              private router: ActivatedRoute,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.songForm = this.formBuilder.group(
      {
        nameSong: ['', [Validators.required]],
        descriptionSong: [''],
        tags: ['']
      });
    this.songService.getSongById(this.id).subscribe(res => {
      this.song = res;
      this.avatarUrlSong = res.avatarUrlSong;
      this.mp3UrlSong = res.mp3UrlSong;
      this.songForm.patchValue(res);
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const song1 = {
      idSong: this.song.idSong,
      nameSong: this.songForm.value.nameSong,
      descriptionSong: this.songForm.value.descriptionSong,
      tags: this.songForm.value.tags,
      avatarUrlSong: this.avatarUrlSong,
      mp3UrlSong: this.mp3UrlSong,
      user: this.song.user,
      dateCreateSong: this.song.dateCreateSong
    };
    console.log(song1)
    this.songService.updateSong(song1.idSong, song1).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: true,
        timer: 3000
      });
    });
  }

  // tslint:disable-next-line:typedef
  // submitAvatar(){
  //   if (this.selectImg !== null){
  //     const filePath = `avatarsong/${this.selectImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //           this.avatarUrlSong = url;
  //         });
  //       })
  //     ).subscribe();
  //   }
  // }

  submitAvatar() {
    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() =>{
        this.downloadImgURL = fileRef.getDownloadURL();
        this.downloadImgURL.subscribe(url => {
          if (url){
            this.avatarUrlSong = url;
          }
          console.log(this.avatarUrlSong);
        })
      })
    )
      .subscribe(url =>{
        if (url){
          console.log(url);
        }
      })
  }

  // tslint:disable-next-line:typedef
  showPre(event: any){
    if (event.target.files && event.target.files[0]){
      this.selectImg = event.target.files[0];
      this.submitAvatar();
    } else {
      this.avatarUrlSong = this.song.avatarUrlSong;
      this.selectImg = null;
    }
  }

  // tslint:disable-next-line:typedef
  // submitFile(){
  //   if (this.selectFile !== null){
  //     const filePath = `file/${this.selectFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, this.selectFile).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //           this.mp3UrlSong = url;
  //         });
  //       })
  //     ).subscribe();
  //   }
  // }

  submitFile() {
    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `RoomsAudios/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsAudios/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() =>{
        this.downloadAudURL = fileRef.getDownloadURL();
        this.downloadAudURL.subscribe(url => {
          if (url){
            this.mp3UrlSong = url;
          }
          console.log(this.mp3UrlSong);
        })
      })
    )
      .subscribe(url =>{
        if (url){
          console.log(url);
        }
      })
  }

  // tslint:disable-next-line:typedef
  showPreFile(event: any){
    if (event.target.files && event.target.files[0]){
      this.selectFile = event.target.files[0];
      this.submitFile();
    } else {
      this.mp3UrlSong = this.song.mp3UrlSong;
      this.selectFile = null;
    }
  }
}
