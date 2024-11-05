interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export class WishlistManager {
  // 임시 wishlist
  wishlist: any;

  toggleWishlist(movie: Movie): void {
      const index = this.wishlist.findIndex((item: { id: number; }) => item.id === movie.id);
      index === -1 ? this.wishlist.push(movie) : this.wishlist.splice(index, 1);
      this.saveWishlist();
  }
  private saveWishlist(): void {
      localStorage.setItem('movieWishlist', JSON.stringify(this.wishlist));
  }
}