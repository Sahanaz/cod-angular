import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoaderService } from 'src/loader.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {

  loading: boolean;
  appTitle: string;
  isFullScreen = false;

  constructor(
    // private sidenav: SidenavService,
    private router: Router,
    private loaderService: LoaderService,
    public titleService: Title) { }

  ngOnInit() {
    this.chkScreenMode();
    this.loaderService.isLoading.subscribe((v) => {
      setTimeout(() => {
        this.loading = v;
      });
    });
  }

  toggleRightSidenav() {
    // this.sidenav.toggle();
  }

  toggleFullScreen() {
    console.log('toggleFullScreen');
    this.isFullScreen ? this.closefullscreen() : this.openfullscreen();
  }

  chkScreenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullScreen = true;
    } else {
      //not in full screen
      this.isFullScreen = false;
    }
  }

  openfullscreen() {
    // Trigger fullscreen
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  closefullscreen() {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  logout() {
    this.router.navigate(['login']);
  }

  navigate(url) {
    this.router.navigate([url]);
  }

}
