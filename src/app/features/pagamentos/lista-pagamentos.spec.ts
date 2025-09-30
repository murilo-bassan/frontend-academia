import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPagamentos } from './lista-pagamentos';

describe('ListaPagamentos', () => {
  let component: ListaPagamentos;
  let fixture: ComponentFixture<ListaPagamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPagamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPagamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
