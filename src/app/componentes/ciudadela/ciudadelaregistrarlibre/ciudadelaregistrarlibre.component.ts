import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../../modelos/usuario-dto';
import { DepartamentoI, CiudadI } from 'src/app/modelos/ciudades';
import { FormControl, Validators } from '@angular/forms';
import { CiudadelaService } from '../../../servicios/ciudadela.service';
import { DepartamentosService } from '../../../servicios/departamentos.service';

import Swal from 'sweetalert2'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ciudadelaregistrarlibre',
  templateUrl: './ciudadelaregistrarlibre.component.html',
  styleUrls: ['./ciudadelaregistrarlibre.component.css']
})
export class CiudadelaregistrarlibreComponent {

  usuarioDto: UsuarioDto[] = [];
  nuevoUsuario: UsuarioDto = { variable1: '', variable2: '', variable3: '', variable4: '', variable5: '', variable6: '', variable7: '', variable8: 'pendiente', variable9: '', variable10: '', variable11: '', variable12: '', variable13: '', variable14: '', variable15: '', variable16: '', evento: 'ciudadela0705', };
  terminos = ""
  confircorreo = ""
  imagenPrevia: any;
  files: any = []

  min = 100000;
  max = 900000;
  x = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

  variable2 = new FormControl('', Validators.required);
  formulariomenor = true
  formulariomayor = false
  numero = 0;
  emailval = ""
  fechaval = ""
  comuna = ""
  public seleccionarDepartamento: DepartamentoI = { id: 0, name: '' };
  public departamentos: DepartamentoI[] = [];
  public seleccionarCiudad: DepartamentoI = { id: 0, name: '' };
  public ciudades: CiudadI[] = [];


  constructor(
    private ciudadelaService: CiudadelaService, private departamentosService: DepartamentosService) { }

  ngOnInit(): void {
    this.departamentos = this.departamentosService.getDepartamentos();
    this.ciudades = this.departamentosService.getCiudades();
  }
  onSelect(usarName: number): void {
    this.ciudades = this.departamentosService.getCiudades().filter(item => item.departamentoId == usarName);
  }


  createPdf() {




    const pdfDefinition: any = {
      content: [
        {
          // If no width/height/fit is used, then dimensions from the svg element is used.
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="95" viewBox="0 0 966 95" version="1.1"><path d="M 126.061 5.250 C 124.930 10.748, 113 73.314, 113 73.749 C 113 73.887, 116.600 74, 121 74 C 125.400 74, 129 73.885, 129 73.743 C 129 73.365, 141.883 5.975, 142.572 2.750 L 143.159 0 135.150 0 L 127.142 0 126.061 5.250 M 157.421 1.396 C 151.806 3.883, 150.580 12.192, 155.337 15.523 C 161.164 19.605, 169 15.405, 169 8.200 C 169 1.931, 163.505 -1.298, 157.421 1.396 M 33 3.098 C 20.554 5.529, 7.437 16.243, 2.863 27.715 C 0.954 32.503, 0.552 35.396, 0.528 44.500 C 0.504 53.966, 0.808 56.076, 2.708 59.628 C 5.835 65.473, 13.315 71.719, 19.328 73.505 C 25.351 75.293, 39.836 75.357, 45.500 73.619 L 49.500 72.392 49.191 65.971 C 49.021 62.439, 48.746 59.413, 48.580 59.247 C 48.414 59.080, 47.061 59.407, 45.574 59.972 C 44.087 60.537, 39.591 61, 35.583 61 C 27.588 61, 23.693 59.215, 19.592 53.673 C 16.466 49.449, 16.632 36.278, 19.890 30 C 24.911 20.326, 30.849 16.631, 41.500 16.552 C 45.350 16.523, 50.030 16.725, 51.901 17 C 55.271 17.495, 55.320 17.447, 57.263 11.662 C 58.422 8.215, 58.858 5.458, 58.327 4.927 C 55.844 2.444, 41.611 1.416, 33 3.098 M 84.407 22.031 C 70.772 24.734, 61.081 33.913, 57.550 47.470 C 54.842 57.865, 56.005 64.853, 61.428 70.770 C 64.352 73.961, 65.363 74.399, 70.695 74.784 C 77.497 75.276, 80.815 73.992, 85.730 68.965 L 88.838 65.786 88.288 69.893 L 87.737 74 95.219 74 L 102.701 74 103.347 64.895 C 103.702 59.887, 105.393 48.820, 107.103 40.302 C 108.826 31.719, 109.831 24.435, 109.357 23.964 C 108.274 22.892, 96.634 20.982, 92 21.117 C 90.075 21.173, 86.658 21.584, 84.407 22.031 M 150 22.769 C 150 23.193, 147.979 34.105, 145.509 47.019 C 143.038 59.934, 141.013 71.287, 141.009 72.250 C 141.001 73.767, 142.031 74, 148.750 73.996 L 156.500 73.993 160.860 50.746 C 163.258 37.961, 165.452 26.262, 165.735 24.750 L 166.250 22 158.125 22 C 153.656 22, 150 22.346, 150 22.769 M 81.898 36.251 C 74.938 40.862, 70.302 56.159, 74.571 60.429 C 78.279 64.136, 84.615 60.919, 87.422 53.904 C 88.896 50.218, 92 37.359, 92 34.935 C 92 33.141, 85.269 34.018, 81.898 36.251" stroke="none" fill="#1b5c8d" fill-rule="evenodd"/><path d="" stroke="none" fill="#000000" fill-rule="evenodd"/><path d="M 260.500 0.924 C 256.850 2.457, 254.601 5.891, 254.710 9.762 C 255.004 20.115, 270.997 19.089, 271.292 8.699 C 271.457 2.866, 265.719 -1.268, 260.500 0.924 M 371.623 1.750 C 371.341 2.712, 370.382 7.563, 369.492 12.528 L 367.874 21.556 360.687 21.585 C 343.816 21.654, 330.480 34.560, 329.230 52.026 C 328.590 60.980, 330.249 66.880, 334.592 71.089 C 337.462 73.871, 338.869 74.435, 343.829 74.794 C 350.024 75.242, 354.287 73.789, 358.750 69.709 L 361 67.651 361 70.826 L 361 74 368 74 C 372.930 74, 375.002 73.630, 375.006 72.750 C 375.024 68.826, 384.641 14.633, 387.516 2.250 C 388.024 0.062, 387.821 0, 380.086 0 C 373.375 0, 372.055 0.273, 371.623 1.750 M 485.071 5.500 C 484.482 8.525, 483.541 13.362, 482.981 16.250 L 481.961 21.500 474.672 21.539 C 461.926 21.607, 451.908 28.407, 446.206 40.860 C 442.464 49.034, 442.021 59.882, 445.179 65.992 C 446.455 68.462, 449.075 71.539, 451 72.830 C 453.953 74.809, 455.469 75.116, 460.702 74.793 C 465.890 74.474, 467.567 73.879, 470.952 71.159 L 475 67.906 475 70.953 L 475 74 481.981 74 C 489.859 74, 489.370 74.586, 490.430 63.883 C 490.869 59.454, 498.752 16.237, 501.582 2.750 L 502.159 0 494.150 0 L 486.142 0 485.071 5.500 M 220.108 3.082 C 207.605 5.537, 195.978 14.569, 190.608 25.997 C 187.969 31.614, 187.500 33.885, 187.166 42.669 C 186.819 51.803, 187.028 53.381, 189.223 58.175 C 192.219 64.719, 197.023 69.669, 202.989 72.356 C 208.690 74.924, 224.167 75.702, 231.500 73.789 L 236.500 72.485 236.145 65.993 C 235.950 62.422, 235.675 59.375, 235.534 59.222 C 235.393 59.069, 234.061 59.407, 232.574 59.972 C 227.765 61.800, 216.377 61.233, 211.885 58.941 C 202.115 53.957, 201.169 35.530, 210.125 24.665 C 215.160 18.556, 220.133 16.508, 229.500 16.688 C 233.900 16.772, 238.579 16.989, 239.899 17.171 C 242.020 17.462, 242.525 16.824, 244.261 11.662 C 245.421 8.215, 245.858 5.458, 245.327 4.927 C 242.858 2.458, 228.599 1.414, 220.108 3.082 M 414.045 22.092 C 398.816 25.078, 387.808 37.427, 386.358 53.152 C 385.600 61.366, 387.123 66.757, 391.360 70.864 C 397.341 76.661, 407.310 76.425, 414.060 70.327 L 418 66.767 418 70.384 L 418 74 425.353 74 L 432.706 74 433.278 64.750 C 433.592 59.663, 435.274 48.589, 437.016 40.141 C 438.758 31.694, 439.804 24.408, 439.341 23.949 C 438.270 22.889, 426.603 20.983, 422 21.117 C 420.075 21.173, 416.495 21.612, 414.045 22.092 M 252.653 22.752 C 252.141 23.580, 243 71.033, 243 72.861 C 243 73.616, 245.636 74, 250.809 74 L 258.619 74 263.346 48.750 C 265.946 34.862, 268.057 23.163, 268.037 22.750 C 267.989 21.769, 253.260 21.771, 252.653 22.752 M 276.109 38.250 C 272.664 56.239, 272.231 64.612, 274.517 69.033 C 278.186 76.128, 290.132 77.117, 298.611 71.027 L 303.274 67.679 302.810 70.839 L 302.346 74 309.423 73.993 L 316.500 73.987 320.803 50.148 C 323.170 37.036, 325.360 25.339, 325.670 24.154 C 326.212 22.081, 325.932 22, 318.225 22 C 310.748 22, 310.181 22.149, 309.673 24.250 C 309.374 25.488, 308.171 31.626, 307 37.891 C 304.420 51.696, 302.701 56.232, 298.813 59.504 C 294.910 62.788, 291.309 62.773, 289.803 59.466 C 288.717 57.083, 289.860 48.981, 294.701 24.750 L 295.250 22 287.236 22 L 279.221 22 276.109 38.250 M 353.973 35.719 C 349.915 38.541, 348.104 41.206, 346.405 46.860 C 341.886 61.896, 353.833 68.023, 360.892 54.290 C 362.513 51.135, 365.275 37.159, 364.616 35.443 C 363.839 33.416, 357.030 33.593, 353.973 35.719 M 412.389 35.905 C 406.820 39.300, 403 46.505, 403 53.613 C 403 59.444, 404.402 62, 407.601 62 C 413.600 62, 416.998 57.308, 419.966 44.925 C 421.077 40.291, 421.989 35.938, 421.993 35.250 C 422.004 33.332, 415.929 33.746, 412.389 35.905 M 466.698 36.960 C 462.423 40.714, 459.795 46.919, 459.780 53.294 C 459.767 58.956, 461.969 62, 466.078 62 C 472.175 62, 477.563 52.025, 478.233 39.495 L 478.500 34.500 474.345 34.197 C 470.895 33.946, 469.597 34.415, 466.698 36.960" stroke="none" fill="#cc242c" fill-rule="evenodd"/><path d="M 849.359 1.423 C 843.650 3.948, 842.715 13.172, 847.886 15.939 C 851.018 17.615, 855.498 17.182, 858.365 14.927 C 860.477 13.266, 861 12.007, 861 8.582 C 861 1.895, 855.683 -1.375, 849.359 1.423 M 535.309 3.665 C 531.609 4.190, 532.854 -0.379, 524.499 43.336 C 521.468 59.195, 519.202 72.517, 519.463 72.941 C 520.355 74.384, 539.700 75.094, 548.465 74.004 C 561.715 72.358, 567.365 69.826, 575.048 62.091 C 582.805 54.282, 585.787 47.579, 586.685 35.927 C 587.788 21.620, 583.011 12.592, 571.283 6.819 C 564.885 3.669, 564.149 3.540, 551.568 3.379 C 544.381 3.287, 537.064 3.415, 535.309 3.665 M 818.993 9.862 C 815.414 10.763, 811.978 11.832, 811.358 12.238 C 810.738 12.643, 809.926 15.006, 809.554 17.488 C 808.908 21.798, 808.728 22, 805.550 22 C 802.486 22, 802.171 22.297, 801.577 25.750 C 801.222 27.813, 800.686 30.738, 800.386 32.250 C 799.886 34.773, 800.096 35, 802.921 35 C 804.614 35, 806 35.338, 806 35.752 C 806 36.166, 805.100 41.227, 804 47 C 801.801 58.538, 801.442 67.088, 803.030 70.055 C 804.736 73.243, 809.433 75.001, 816.200 74.985 C 819.665 74.976, 823.008 74.639, 823.630 74.235 C 824.251 73.831, 825.070 70.794, 825.451 67.486 L 826.142 61.472 822.945 61.486 C 817.859 61.508, 817.343 59.596, 819.387 48.325 C 821.998 33.931, 821.348 35, 827.488 35 C 833.392 35, 832.867 35.685, 834.577 25.750 L 835.223 22 829.998 22 L 824.773 22 825.458 17.250 C 825.835 14.637, 826.385 11.488, 826.680 10.250 C 827.294 7.678, 827.602 7.694, 818.993 9.862 M 545.512 18.250 C 545.222 19.488, 543.262 29.613, 541.156 40.750 L 537.327 61 539.914 61.097 C 546.961 61.361, 550.953 60.674, 555.754 58.370 C 562.291 55.233, 566.467 49.482, 568.660 40.595 C 572.413 25.386, 565.884 16, 551.551 16 C 546.657 16, 545.979 16.252, 545.512 18.250 M 611.492 22.736 C 604.854 25.112, 599.765 29.121, 596.144 34.827 C 591.977 41.393, 590.709 46.563, 591.145 55.200 C 591.596 64.140, 594.594 69.605, 600.661 72.552 C 606.162 75.224, 617.651 75.662, 625.622 73.504 L 632 71.778 632 66.448 C 632 63.517, 631.591 60.865, 631.091 60.556 C 630.591 60.247, 627.387 60.711, 623.971 61.586 C 620.266 62.535, 616.350 62.913, 614.268 62.522 C 610.942 61.898, 606 58.111, 606 56.186 C 606 55.689, 610.308 54.792, 615.574 54.194 C 632.044 52.323, 638.484 47.487, 638.448 37.018 C 638.426 30.682, 636.520 27.102, 631.525 24.016 C 626.783 21.085, 617.723 20.506, 611.492 22.736 M 671.655 22.459 C 669.541 23.213, 666.728 24.846, 665.405 26.089 L 663 28.349 663 25.174 L 663 22 656.079 22 C 648.322 22, 648.980 21.235, 647.480 32 C 646.948 35.816, 638.104 83.920, 636.403 92.250 L 635.841 95 643.921 95 C 648.364 95, 652 94.825, 652 94.610 C 652 93.779, 655.127 77.410, 655.580 75.868 C 655.981 74.503, 657.120 74.320, 662.511 74.753 C 672.530 75.557, 677.371 73.754, 684.650 66.507 C 689.853 61.328, 691.125 59.336, 692.900 53.587 C 696.441 42.124, 695.445 32.486, 690.114 26.627 C 685.218 21.245, 678.997 19.841, 671.655 22.459 M 722.792 22.343 C 711.001 25.665, 703.175 35.135, 700.957 48.764 C 699.165 59.777, 703.568 69.081, 712.491 73.135 C 717.598 75.455, 727.060 75.540, 733.563 73.324 C 740.400 70.994, 748.032 63.204, 750.846 55.681 C 753.349 48.993, 753.723 38.646, 751.640 33.718 C 750.058 29.974, 745.717 25.422, 741.796 23.394 C 737.795 21.326, 728.273 20.799, 722.792 22.343 M 788.586 22.043 C 786.983 22.523, 783.945 24.600, 781.836 26.660 L 778 30.406 778 26.157 L 778 21.909 771.250 22.204 L 764.500 22.500 763.758 30 C 763.084 36.826, 757.633 68.061, 756.386 72.250 C 755.921 73.814, 756.714 74, 763.865 74 C 770.627 74, 771.943 73.729, 772.367 72.250 C 772.643 71.287, 773.826 65.550, 774.996 59.500 C 778.113 43.391, 782.625 37, 790.879 37 C 793.705 37, 793.917 36.705, 795.013 31.250 C 795.648 28.087, 796.403 24.488, 796.692 23.250 C 797.145 21.306, 796.828 21.012, 794.358 21.086 C 792.786 21.133, 790.189 21.564, 788.586 22.043 M 939.407 22.031 C 929.298 24.035, 920.122 30.879, 915.612 39.779 C 910.736 49.402, 910.209 62.092, 914.420 68.518 C 920.099 77.185, 935.103 77.059, 941.958 68.285 L 944.134 65.500 943.662 69.750 L 943.190 74 950.451 74 L 957.712 74 958.361 65.750 C 958.717 61.212, 960.417 50.445, 962.139 41.822 C 963.861 33.199, 965.018 25.488, 964.710 24.688 C 963.630 21.873, 948.314 20.265, 939.407 22.031 M 837.678 46.750 C 835.093 60.363, 832.983 72.063, 832.989 72.750 C 832.997 73.642, 835.231 74, 840.791 74 L 848.582 74 853.318 48.750 C 855.923 34.862, 858.042 23.163, 858.027 22.750 C 858.012 22.337, 854.485 22, 850.189 22 L 842.378 22 837.678 46.750 M 863.727 22.709 C 863.406 23.283, 868.618 55.671, 871.947 73.790 C 871.976 73.950, 875.638 73.950, 880.084 73.790 L 888.168 73.500 902.084 48.606 C 909.738 34.915, 916 23.328, 916 22.856 C 916 22.385, 912.154 22, 907.454 22 L 898.908 22 894.835 30.750 C 892.594 35.563, 889.060 43.510, 886.981 48.412 L 883.201 57.324 882.501 49.857 C 882.116 45.749, 881.284 37.914, 880.651 32.445 L 879.500 22.500 871.834 22.209 C 867.618 22.050, 863.969 22.275, 863.727 22.709 M 613.230 35.001 C 609.997 36.972, 607.102 41.435, 608.287 42.620 C 609.457 43.791, 621.480 41.046, 622.750 39.318 C 624.370 37.114, 624.327 36.469, 622.429 34.571 C 620.310 32.453, 617.169 32.599, 613.230 35.001 M 667.919 36.272 C 663.791 39.048, 660.472 46.659, 659.454 55.682 L 658.757 61.864 662.354 62.539 C 667.611 63.525, 671.858 60.730, 675.250 54.054 C 681.561 41.633, 676.868 30.252, 667.919 36.272 M 723.698 36.023 C 719.962 38.962, 716.704 48.307, 717.279 54.436 C 718.514 67.600, 731.368 64.862, 735.529 50.548 C 738.377 40.751, 735.910 34, 729.480 34 C 727.714 34, 725.113 34.910, 723.698 36.023 M 936.957 36.250 C 927.722 42.474, 924.949 62, 933.301 62 C 938.962 62, 943.072 55.644, 945.962 42.420 L 947.802 34 944.049 34 C 941.813 34, 938.946 34.909, 936.957 36.250" stroke="none" fill="#3f8151" fill-rule="evenodd"/></svg>'
        },

        {
          // you can also fit the svg inside a rectangle



        },
        // you can also fit the svg inside a rectangle


        { text: 'Registro Exitoso Ciudadela de la Alegría', fontSize: 27, bold: true, margin: [0, 0, 0, 0], color: '#9b2482', },


        { text: 'Datos Del Participante:', fontSize: 20, bold: true, margin: [0, 10, 0, 10] },
        {
          style: 'tableExample',
          table: {
            headerRows: 0,
            body: [
              [{ text: 'Nombre del Menor:', style: 'tableHeader', bold: true }, this.nuevoUsuario.variable2],
              [{ text: 'Nombre del Adulto:', style: 'tableHeader', bold: true }, this.nuevoUsuario.variable10],
              [{ text: 'Código unico de registro: ', style: 'tableHeader', bold: true }, this.x],

            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 10, 0, 40],
          fontSize: 15
        },


        { text: 'Datos Del Evento:', fontSize: 20, bold: true, margin: [0, 10, 0, 10] },
        {
          style: 'tableExample',
          table: {
            headerRows: 0,
            body: [
              [{ text: 'Lugar del Evento:', style: 'tableHeader', bold: true }, 'Canchas Panamericanas'],
              [{ text: 'Hora de inicio del evento:', style: 'tableHeader', bold: true }, 'Domingo 03 de Septiembre de 2023'],

            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 10, 0, 40],
          fontSize: 15
        },

        { text: 'Ciudadela de la alegría "Un espectáculo de diversión, circo y aventuras por motón"', fontSize: 20, bold: true, margin: [0, 10, 0, 10], color: '#038d3f' },


        { text: 'Informacion importante:', fontSize: 20, bold: true, margin: [0, 10, 0, 10] },

        {


          columns: [
            {
              width: '100%',
              text: '1. La Ciudadela de la Alegría conmemorará el mes de la Niñez y la Recreación con toda la Familia Este Domingo 03 de Septiembre de 2023, Te esperamos para que disfrutemos juntos la sexta versión de esta Ciudadela de la Alegría donde el juego y la recreación serán protagonistas! #CaliCiudadDeportiva'
            },



          ], margin: [0, 10, 0, 10]

        },

        {


          columns: [
            {
              width: '100%',
              text: '2. Para reclamar el kit es necesario  ir con el documento del adulto registrado o el del menor registrado'
            },



          ], margin: [0, 10, 0, 10]



        },

        {


          columns: [
            {
              width: '100%',
              text: '3. El codigo unico de registro es el identificador de que se registro en la plataforma este codigo es unico y queda ligado con los datos ingresados del participante '
            },



          ], margin: [0, 10, 0, 10]



        },
        {


          columns: [
            {
              width: '100%',
              text: '4. Recuerda que si no estas registrado igualmente puedes participar en el evento '
            },



          ], margin: [0, 10, 0, 10]



        }
      ],

      styles: {
        Titulo: {
          fontSize: 50,
          alignament: 'center',
          bolditalics: true
        },

        Titulo1: {
          fontSize: 15,
          alignament: 'center',
          bolditalics: true
        },

        Titulo2: {
          fontSize: 28,
          alignament: 'center',
          bolditalics: true
        }
      }
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.download();
  }




  public formulariomenorvalidar() {
    this.nuevoUsuario.variable4 = this.fechaval


    this.nuevoUsuario.variable15 = String(this.x)


    this.nuevoUsuario.variable8 = "pendiente"
    this.nuevoUsuario.variable7 = String(this.seleccionarDepartamento) + " " + String(this.seleccionarCiudad)


    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    console.log(this.nuevoUsuario)
    if (this.nuevoUsuario.variable1 == "") {
      Swal.fire('El número de documento del menor debe ser diligenciado')
    }
    else if (this.nuevoUsuario.variable2 == "") {

      Swal.fire('El nombre del menor debe ser diligenciado')

    }
    else if (this.nuevoUsuario.variable3 == "") {

      Swal.fire('El tipo de identificación del menor debe ser diligenciado')



    } else if (this.nuevoUsuario.variable4 == "") {
      Swal.fire('La fecha del nacimiento del participante debe ser diligenciada')


    } else if (this.nuevoUsuario.variable5 == "") {

      Swal.fire('El genero del menor debe ser diligenciado')

    } else if (this.nuevoUsuario.variable6 == "") {
      Swal.fire('La etnia del menor debe ser diligenciada')


    } else if (this.nuevoUsuario.variable9 == "") {
      Swal.fire('La comuna debe ser diligenciada ')
    } else if (String(this.seleccionarDepartamento) == "") {
      Swal.fire('El departamento debe ser diligenciado ')
    } else if (String(this.seleccionarCiudad).length > 500) {
      Swal.fire('Debes diligenciar el departamento y la ciudad ')
    }
    else if (this.nuevoUsuario.variable10 == "") {

      Swal.fire('El nombre del adulto debe ser diligenciado')



    }

    else if (this.nuevoUsuario.variable11 == "") {

      Swal.fire('La cedula del adulto debe ser diligenciado')

    }

    else if (this.nuevoUsuario.variable12 == "") {

      Swal.fire('El célular del adulto debe ser diligenciado')


    }

    else if (this.nuevoUsuario.variable12?.length != 10) {

      Swal.fire('El célular debe ser de 10 digitos')

    }



    else if (this.nuevoUsuario.variable13 == "") {

      Swal.fire('Correo electrónico no diligenciado')

    } else if (validEmail.test(this.nuevoUsuario.variable13) == false) {

      Swal.fire('Por favor diligenciar un correo valido. Ejemplo: caliciudaddeportiva@gmail.com')

    }


    else if (this.nuevoUsuario.variable14 == "") {

      Swal.fire('Debes ingresar si el adulto trabaja en la secretaria de deporte y recreacion')

    } else if (this.terminos == "") {

      Swal.fire('Se debe aceptar los terminos y condiciones')

    }
    else {
      console.log(this.nuevoUsuario)
      this.ciudadelaService.createUserCiudadela(this.nuevoUsuario).subscribe(
        (data: any) => {
          if (data.status == 200) {
            Swal.fire('Felicidades ya el menor ya se encuentra participando en el evento con numero: ' + this.x)
            this.createPdf()
            this.nuevoUsuario.variable1 = ""
            this.nuevoUsuario.variable2 = ""
            this.nuevoUsuario.variable3 = ""
            this.nuevoUsuario.variable4 = ""
            this.nuevoUsuario.variable5 = ""
            this.nuevoUsuario.variable6 = ""
            this.nuevoUsuario.variable7 = ""
            this.nuevoUsuario.variable8 = ""
            this.nuevoUsuario.variable9 = ""
            this.nuevoUsuario.variable10 = ""
            this.nuevoUsuario.variable11 = ""
            this.nuevoUsuario.variable12 = ""
            this.nuevoUsuario.variable13 = ""
            this.nuevoUsuario.variable14 = ""
            this.nuevoUsuario.variable15 = ""
            this.nuevoUsuario.variable16 = ""
            this.emailval = ""
            this.fechaval = ""
            this.x = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);


          } else {

            Swal.fire(data.payload.message)

            this.formulariomenor = true
            this.formulariomayor = false
          }
        }, (error) => {
          console.log(error);
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')
          this.formulariomenor = true
          this.formulariomayor = false
          this.nuevoUsuario.variable1 = ""
          this.nuevoUsuario.variable2 = ""
          this.nuevoUsuario.variable3 = ""
          this.nuevoUsuario.variable4 = ""
          this.nuevoUsuario.variable5 = ""
          this.nuevoUsuario.variable6 = ""
          this.nuevoUsuario.variable7 = ""
          this.nuevoUsuario.variable8 = ""
          this.nuevoUsuario.variable9 = ""
          this.nuevoUsuario.variable10 = ""
          this.nuevoUsuario.variable11 = ""
          this.nuevoUsuario.variable12 = ""
          this.nuevoUsuario.variable13 = ""
          this.nuevoUsuario.variable14 = ""
          this.nuevoUsuario.variable15 = ""
          this.nuevoUsuario.variable16 = ""
          this.x = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);


          this.emailval = ""
          this.fechaval = ""


        }
      );


    }



  }


}
