import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';

describe('AppComponent', () => {
  let authServiceStub = {
    provider: 'Github',
    isAuthenticated: true,
    fetch() {
      return true
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        }
      ]
    }).compileComponents();
  }));

  it('should display a menu if user is authenticated', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('Dashboard');
  }));

  it('should not have show menu is unauthenticated', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    let authService = fixture
      .debugElement
      .injector
      .get(AuthService);
    authService.isAuthenticated = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeNull();
  }));
});
