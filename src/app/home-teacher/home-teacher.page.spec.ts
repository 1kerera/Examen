import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTeacherPage } from './home-teacher.page';

describe('HomeTeacherPage', () => {
  let component: HomeTeacherPage;
  let fixture: ComponentFixture<HomeTeacherPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeTeacherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
