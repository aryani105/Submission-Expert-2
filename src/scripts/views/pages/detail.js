/* eslint-disable no-undef */
import RestaurantsSource from '../../data/restaurants-source';
import UrlParser from '../../routes/url-parser';
import {
  createRestaurantsDetailTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const DetailRestaurants = {
    async render() {
      return `
      <h2 tabindex="0" class="title">Detail Page</h2>
        <section class="content"></section>
        <div id="likeButtonContainer"></div>
      `;
    },

    async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantsSource.detailResto(url.id);
    const restoranContainer = document.querySelector('.content');
    restoranContainer.classList.add('detail-page');
    restoranContainer.innerHTML += createRestaurantsDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          pictureId: restaurant.pictureId,
          description: restaurant.description,
          city: restaurant.city,
          rating: restaurant.rating,
      },
  });
    },
  };

  export default DetailRestaurants;