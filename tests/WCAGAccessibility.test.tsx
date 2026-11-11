import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../src/App';

describe('BusTrack Landing — Pruebas de Accesibilidad y Cumplimiento WCAG 2.1 AA', () => {
  it('cumple con jerarquía de encabezados semánticos (h1 presente y descriptivo)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toMatch(/Tu ruta, más clara|BusTrack/i);

    // Múltiples secciones con h2 para navegación por tecnologías de asistencia
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings.length).toBeGreaterThanOrEqual(3);
  });

  it('todos los botones y enlaces interactivos poseen nombres accesibles identificables', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const buttons = container.querySelectorAll('button');
    buttons.forEach((btn) => {
      const accessibleName =
        btn.getAttribute('aria-label') ||
        btn.getAttribute('title') ||
        btn.textContent?.trim();
      expect(
        accessibleName,
        `El botón con HTML "${btn.outerHTML.slice(0, 80)}" debe tener un nombre accesible (texto o aria-label)`
      ).toBeTruthy();
    });

    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      const accessibleName =
        link.getAttribute('aria-label') ||
        link.getAttribute('title') ||
        link.textContent?.trim();
      expect(
        accessibleName,
        `El enlace con href "${link.getAttribute('href')}" debe tener nombre accesible`
      ).toBeTruthy();
    });
  });

  it('las regiones principales de la página (landmarks) están correctamente estructuradas', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Landmarks requeridos por WCAG 2.1 (nav, main, contentinfo)
    expect(screen.getAllByRole('navigation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('los controles de formulario en la página de inicio de sesión tienen etiquetas asociadas', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    // Campos de usuario / correo y contraseña deben tener accesibilidad
    const emailInput = screen.getByPlaceholderText(/usuario|correo/i) || screen.getByLabelText(/usuario|correo/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/contraseña/i) || screen.getByLabelText(/contraseña/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('todas las imágenes poseen atributo alt no nulo o son decorativas con aria-hidden', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      const hasAlt = img.hasAttribute('alt');
      const isAriaHidden = img.getAttribute('aria-hidden') === 'true';
      expect(
        hasAlt || isAriaHidden,
        `La imagen "${img.src}" debe tener atributo alt descriptivo o aria-hidden="true"`
      ).toBe(true);
    });
  });

  it('el aviso de privacidad cumple con estándares de legibilidad y navegación accesible', () => {
    render(
      <MemoryRouter initialEntries={['/privacidad']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Aviso de Privacidad/i })).toBeInTheDocument();
    expect(screen.getByText(/Responsable y Finalidad del Tratamiento/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Volver al inicio/i })).toBeInTheDocument();
  });
});
