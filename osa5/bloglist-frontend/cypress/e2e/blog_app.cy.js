describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'testuser', name: 'test user', password: 'salasana' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('test user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('salis')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testuser', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('cypressblog')
      cy.get('#author-input').type('robot')
      cy.get('#url-input').type('www')
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('cypressblog robot')
      cy.contains('www')
      cy.contains('0')
      cy.contains('test user')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('cypressblog')
      cy.get('#author-input').type('robot')
      cy.get('#url-input').type('www')
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be removed', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('cypressblog')
      cy.get('#author-input').type('robot')
      cy.get('#url-input').type('www')
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('blog removed successfully')
    })

    it.only('Blogs are in order of likes', function() {
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { 'title': 'mediumlikeblog',
          'author': 'likemaster',
          'url': 'www',
          'likes': 500 },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })

      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { 'title': 'highlikeblog',
          'author': 'likeapprentice',
          'url': 'www',
          'likes': 99999 },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })

      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { 'title': 'lowlikeblog',
          'author': 'likenoob',
          'url': 'www',
          'likes': 1 },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })
      cy.visit('http://localhost:3000')
      cy.get('.blog').eq(0).should('contain', 'highlikeblog')
      cy.get('.blog').eq(1).should('contain', 'mediumlikeblog')
      cy.get('.blog').eq(2).should('contain', 'lowlikeblog')
    })
  })
})