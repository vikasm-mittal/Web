using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TypescriptApp.App_Start;
using TypescriptApp.Models;

namespace TypescriptApp.Controllers
{
    public class PostsController : ApiController
    {
        // GET: api/Posts
        public IHttpActionResult Get()
        {
            return Ok(DataRepository.Posts);
        }

        // GET: api/Posts/5
        public IHttpActionResult Get(int id)
        {
            var returnPost = DataRepository.Posts.FirstOrDefault(x => x.Id == id);
            if (returnPost == null)
            {
                return NotFound();
            }

            return Ok(returnPost);
        }

        // POST: api/Posts
        public IHttpActionResult Post([FromBody]Post post)
        {
            var maxId = DataRepository.Posts.Max(x => x.Id);
            post.Id = ++maxId;

            DataRepository.Posts.Add(post);
            return Ok(post);
        }

        // PUT: api/Posts/5
        public IHttpActionResult Put(int id, [FromBody]Post post)
        {
            var index = DataRepository.Posts.FindIndex(x => x.Id == id);
            if (index > -1)
            {
                DataRepository.Posts[index] = post;
                return Ok();
            }
            return NotFound();
        }

        // DELETE: api/Posts/5
        public IHttpActionResult Delete(int id)
        {
            var post = DataRepository.Posts.FirstOrDefault(x => x.Id == id);
            if (post != null)
            {
                DataRepository.Posts.Remove(post);
                return Ok();
            }
            return NotFound();
        }
    }
}
