import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPagamento } from './form-pagamento';

describe('FormPagamento', () => {
  let component: FormPagamento;
  let fixture: ComponentFixture<FormPagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPagamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPagamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
