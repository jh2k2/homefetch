import { Component, OnInit, ViewChild, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../model/property.model';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  public longitude;
  public latitude;
  public city;

  public user: User;

  @Input() prop: Property = { deposit: null, monthly: null, rooms: null, area: null, available: null, minstay: null, maxstay: null, title: null, description: null, rules: null, documents: null, landlordrules: null, bathrooms: null, street: null, electricity: 'included', water: 'included', gas: 'included', wifi:'included' };
  @Output() public event = new EventEmitter();
  form: FormGroup;

  public url = ["", "../../../assets/images/placeholder.jpg",
    "../../../assets/images/placeholder.jpg",
    "../../../assets/images/placeholder.jpg",
    "../../../assets/images/placeholder.jpg"];
  public iconURL = ['', "../../../assets/icons/B-wireless-network.png",
    "../../../assets/icons/B-hdtv.png",
    "../../../assets/icons/B-bed.png",
    "../../../assets/icons/B-single-bed.png",

    "../../../assets/icons/B-air-conditioner.png",
    "../../../assets/icons/B-fridge.png",
    "../../../assets/icons/B-stove-oven.png",
    "../../../assets/icons/B-washing-machine.png",

    "../../../assets/icons/B-bathtub.png",
    "../../../assets/icons/B-microwave.png",
    "../../../assets/icons/B-landline.png",
    "../../../assets/icons/B-fireplace.png"
  ];
  public fileToUpload: File[] = [];
  public isAddedFile = [];
  public isClicked = [];

  constructor(private router: Router, private propSer: PropertyService, private userSer: UserService) { }

  ngOnInit() {
    this.userSer.getSettings().subscribe(
      data => {
        this.user = data.user;
        if (this.user.landlord != 1 && this.user.admin == 0) {
          this.router.navigate(['/']);
        }
      });

    this.form = new FormGroup({
      deposit: new FormControl(this.prop.deposit, [Validators.required, Validators.min(50), Validators.max(10000)]),
      monthly: new FormControl(this.prop.monthly, [Validators.required, Validators.min(50), Validators.max(10000)]),
      rooms: new FormControl(this.prop.rooms, [Validators.required, Validators.max(10)]),
      area: new FormControl(this.prop.area, [Validators.required, Validators.min(3), Validators.max(10000)]),
      available: new FormControl(formatDate(this.prop.available, 'yyyy-MM-dd', 'en'), [Validators.required]),
      minstay: new FormControl(this.prop.minstay, [Validators.required]),
      maxstay: new FormControl(this.prop.maxstay, [Validators.required]),
      title: new FormControl(this.prop.title, [Validators.required]),
      description: new FormControl(this.prop.description, [Validators.required, Validators.minLength(40)]),
      rules: new FormControl(this.prop.rules, [Validators.required]),
      documents: new FormControl(this.prop.description, [Validators.required]),
      landlordrules: new FormControl(this.prop.rules, [Validators.required]),
      bathrooms: new FormControl(this.prop.bathrooms, [Validators.required]),
      street: new FormControl(this.prop.street, [Validators.required, Validators.minLength(2)]),
      electricity: new FormControl(this.prop.electricity),
      water: new FormControl(this.prop.water),
      gas: new FormControl(this.prop.gas),
      wifi: new FormControl(this.prop.wifi),
    });

    this.isClicked[1] = this.prop.internet;
    this.isClicked[2] = this.prop.cableTV;
    this.isClicked[3] = this.prop.bBed;
    this.isClicked[4] = this.prop.sBed;
    this.isClicked[5] = this.prop.conditioner;
    this.isClicked[6] = this.prop.fridge;
    this.isClicked[7] = this.prop.stove;
    this.isClicked[8] = this.prop.washer;
    this.isClicked[9] = this.prop.bathub;
    this.isClicked[10] = this.prop.microwave;
    this.isClicked[11] = this.prop.landline;
    this.isClicked[12] = this.prop.fireplace;
    if (this.prop.image1 != "no" && this.prop.image1 != undefined) {
      this.url[1] = this.propSer.getImateUrl(this.prop.image1);
      this.isAddedFile[1] = true;
    }
    if (this.prop.image2 != "no" && this.prop.image2 != undefined) {
      this.url[2] = this.propSer.getImateUrl(this.prop.image2);
      this.isAddedFile[2] = true;
    }
    if (this.prop.image3 != "no" && this.prop.image3 != undefined) {
      this.url[3] = this.propSer.getImateUrl(this.prop.image3);
      this.isAddedFile[3] = true;
    }
    if (this.prop.image4 != "no" && this.prop.image4 != undefined) {
      this.url[4] = this.propSer.getImateUrl(this.prop.image4);
      this.isAddedFile[4] = true;
    }
    if (this.prop.image5 != "no" && this.prop.image5 != undefined) {
      this.url[5] = this.propSer.getImateUrl(this.prop.image5);
      this.isAddedFile[5] = true;
    }
  }

  onSubmit() {
    if (confirm("Are you sure about the accuracy of these informations?")) {
    } else {
      return;
    }

    let test = this.form.value.street.formatted_address.split(' ');
    test = test[test.length - 2] + ' ' + test[test.length - 1];

    const property = new Property(
      this.form.value.deposit,
      this.form.value.monthly,
      this.form.value.rooms,
      this.form.value.area,
      this.form.value.available,
      this.form.value.minstay,
      this.form.value.maxstay,
      this.form.value.title,
      this.form.value.description,
      this.form.value.rules,
      this.form.value.documents,
      this.form.value.landlordrules,
      this.form.value.bathrooms,
      this.form.value.electricity,
      this.form.value.water,
      this.form.value.gas,
      this.form.value.wifi,
      this.form.value.street.name,
      test,
      this.form.value.street.vicinity,
      this.longitude,
      this.latitude,
      this.isActive(1),
      this.isActive(2),
      this.isActive(3),
      this.isActive(4),
      this.isActive(5),
      this.isActive(6),
      this.isActive(7),
      this.isActive(8),
      this.isActive(9),
      this.isActive(10),
      this.isActive(11),
      this.isActive(12),
      this.prop.user,
      this.sendEditedImage(1),
      this.sendEditedImage(2),
      this.sendEditedImage(3),
      this.sendEditedImage(4),
      this.sendEditedImage(5)
    );
    var objToSend = { property: property, files: this.fileToUpload };
    this.form.reset;
    this.event.emit(objToSend);
  }

  sendEditedImage(num) {
    if (this.isAdded(num) != true) return "no";
    else {
      if (num == 1) if (!this.isThereAfile(1)) return this.prop.image1; else return "no";
      if (num == 2) if (!this.isThereAfile(2)) return this.prop.image2; else return "no";
      if (num == 3) if (!this.isThereAfile(3)) return this.prop.image3; else return "no";
      if (num == 4) if (!this.isThereAfile(4)) return this.prop.image4; else return "no";
      if (num == 5) if (!this.isThereAfile(5)) return this.prop.image5; else return "no";
    }
  }

  isThereAfile(num) { if (this.fileToUpload[num] == null || this.fileToUpload[num] == undefined) return false; else return true; }

  changeI(num) { if (this.isActive(num)) this.isClicked[num] = false; else this.isClicked[num] = true; }

  onLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  isActive(num) { return this.isClicked[num] == true; }

  isAdded(num) { if (this.isAddedFile[num] == true) return true; else return false; }

  clearImage(num) {
    this.fileToUpload[num] = null; this.url[num] = '../../../assets/images/placeholder.jpg'; this.isAddedFile[num] = false;
  }

  onImageAdded(event, num) {
    var temp = event.target.files[0];
    if (temp != undefined)
      if (temp.type.split('/')[0] == "image")
        if (event.target.files && event.target.files[0]) {
          this.fileToUpload[num] = event.target.files[0];
          this.isAddedFile[num] = true;
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.url[num] = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
        }
  }

  openUpload(event: any, num) {
    event.preventDefault();
    var element: HTMLElement;
    if (num == 1) element = document.getElementById('upload') as HTMLElement;
    if (num == 2) element = document.getElementById('upload2') as HTMLElement;
    if (num == 3) element = document.getElementById('upload3') as HTMLElement;
    if (num == 4) element = document.getElementById('upload4') as HTMLElement;
    if (num == 5) element = document.getElementById('upload5') as HTMLElement;
    element.click();
  }

}
