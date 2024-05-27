import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NoConnectionService } from '../../services/no-connection/no-connection.service'

@Component({
  standalone: true,
  selector: 'gl-no-connection',
  imports: [CommonModule],
  templateUrl: './no-connection.component.html',
})
export class NoConnectionComponent implements OnInit {
  constructor(private NoConnectionService: NoConnectionService) {}

  ngOnInit() {
    this.NoConnectionService.isVerifyConnection()
  }
}
