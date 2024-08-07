import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

import { SkeletonModule } from 'primeng/skeleton'

@Component({
  standalone: true,
  selector: 'gl-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  imports: [CommonModule, SkeletonModule],
})
export class LoadingComponent {}
