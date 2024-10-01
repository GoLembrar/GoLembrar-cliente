import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { MessageService } from 'primeng/api'
import { of } from 'rxjs'
import { LayoutComponent } from './layout.component'

describe('LayoutComponent', () => {
  let component: LayoutComponent
  let fixture: ComponentFixture<LayoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, HttpClientModule, NoopAnimationsModule],
      providers: [
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
            queryParamMap: of(convertToParamMap({})),
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
