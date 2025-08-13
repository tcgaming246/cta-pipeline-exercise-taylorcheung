using Cta.Exercise.Application.Mappers;
using Cta.Exercise.Core.Dtos;
using Cta.Exercise.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Cta.Exercise.Application.Services;

public class BaseService : IBaseService
{
    private readonly IBaseRepository _repository;

    public BaseService(IBaseRepository repository)
    {
        _repository = repository;
    }

    public ActionResult<U> Create<T, U>(T entity) where T : BaseCreateDto where U : BaseGetDto
    {
        if(entity.Name.Equals("") || entity.Description.Equals(""))
        {
            return new BadRequestResult();
        }
        var entities = _repository.GetAll();
        foreach(var item in entities)
        {
            if (item.Name.ToLower().Equals(entity.Name.ToLower()))
            {
                return new BadRequestResult();
            }
        }
        var dto = entity;
        var baseEntity = BaseMapper.Map(dto);
        _repository.Add(baseEntity);
        var gDTO = BaseMapper.Map(baseEntity);

        return new OkObjectResult(gDTO);
        
    }

    public ActionResult<string> Delete(string id)
    {
        _repository.Delete(id);
        return new OkObjectResult(id);
    }

    public ActionResult<T?> GetById<T>(string id) where T : BaseGetDto
    {
        var item = _repository.GetById(id);
        if (item == null)
        {
            Console.WriteLine("Skill/Hobby cannot be found.");
            return null;
        }
        var dto = item;
        return new OkObjectResult(dto);
        //throw new NotImplementedException();
    }

    public ActionResult<List<T?>> GetByType<T>() where T : BaseGetDto
    {
        var entities = _repository.GetByType(BaseGetDto.GetTypeByConstraint(typeof(T)));
        var dtos = entities.Select(x => BaseMapper.Map(x) as T).ToList();

        return new OkObjectResult(dtos);
    }

    public ActionResult<U> Update<T, U>(string id, T entity)
        where T : BaseUpdateDto
        where U : BaseGetDto

    {
        if (entity.Name.Equals("") || entity.Description.Equals(""))
        {
            return new BadRequestResult();
        }
        var entities = _repository.GetAll();
        foreach (var item in entities)
        {
            if (item.Name.ToLower().Equals(entity.Name.ToLower()) && item.Id != id)
            {
                return new BadRequestResult();
            }

        }
        
        var baseEntity = BaseMapper.Map(entity, id);
        _repository.Update(baseEntity);
        var gDTO = BaseMapper.Map(baseEntity);
       

        return new OkObjectResult(gDTO);
        


    }
}
