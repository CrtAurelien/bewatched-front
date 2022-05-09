import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const routeTransitionAnimations = trigger('triggerName', [
  transition('accueil <=> shop, ' +
    'accueil <=> contact,' + 'shop <=> detail-montre', [
    style({position: 'relative'}),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        left:0,
        bottom:0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('.4s ease-in', style({  display: 'none', opacity: 0 }))]),
      query(':enter', [animate('.4s ease-out', style({ display: 'block', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ])
]);
