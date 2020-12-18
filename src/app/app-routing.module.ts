import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosComponent } from './pages/heros/heros.component';
import { HeroeComponent } from './pages/heroe/heroe.component';

export const ROUTES: Routes = [
  {path: 'heroes', component: HerosComponent},
  {path: 'heroe/:id', component: HeroeComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
